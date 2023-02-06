import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import { HistoryCard } from "../../components/HistoryCard";
import { DATA_KEY } from "../../config/consts";
import { categories } from "../../utils/categories";
import { DataListProps } from "../Dashboard";
import {
  Container,
  Header,
  Title,
  MonthSelector,
  MonthSelectorButton,
  MonthSelectorIcon,
  Month,
  LoadContainer,
} from "./styles";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths } from "date-fns";
import { format } from "date-fns/esm";
import { ptBR } from "date-fns/locale";

interface TotalByCategoryProps {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Summary() {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<
    TotalByCategoryProps[]
  >([]);

  function heandleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  const loadTransactions = async () => {
    setIsLoading(true);

    const response = await AsyncStorage.getItem(DATA_KEY);
    const transactions: DataListProps[] = response ? JSON.parse(response) : [];

    const expensives = transactions.filter(
      (expensive) =>
        expensive.type === "outcome" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce((accumulator, expensive) => {
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: TotalByCategoryProps[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = ((categorySum / expensiveTotal) * 100).toFixed(0) + "%";

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent,
        });
      }
    });

    setTotalByCategory(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <MonthSelector>
            <MonthSelectorButton onPress={() => heandleDateChange("prev")}>
              <MonthSelectorIcon name="chevron-left" />
            </MonthSelectorButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", {
                locale: ptBR,
              })}
            </Month>

            <MonthSelectorButton onPress={() => heandleDateChange("next")}>
              <MonthSelectorIcon name="chevron-right" />
            </MonthSelectorButton>
          </MonthSelector>

          <VictoryPie
            data={totalByCategory}
            x="percent"
            y="name"
            colorScale={totalByCategory.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />

          <FlatList
            data={totalByCategory}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <HistoryCard
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 24 }}
          />
        </>
      )}
    </Container>
  );
}
