import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useTheme } from "styled-components/native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { DATA_KEY, SET_CLEAR_DATA_BUTTON } from "../../config/consts";
import { useAuth } from "../../hooks/auth";
import { clearDataStorage } from "../../utils/clearDataStorage";
import { formatCurrency } from "../../utils/formatCurrency";
import defaultUserPhoto from "../../assets/userPhotoDefault.png";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
  EmptyList,
  ButtonsWrapper
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: number;
  lastTransaction: string;
  isExist: boolean;
}

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const theme = useTheme();
  const { user, signOut } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  function getLastTransactionDateByType(
    collection: DataListProps[],
    type: "income" | "outcome"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  function getFirstTransactionDate(collection: DataListProps[]) {
    const lastTransaction = new Date(
      Math.min.apply(
        Math,
        collection.map((transaction) => new Date(transaction.date).getTime())
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "short", year: "2-digit" }
    )}`;
  }

  function getLastTransactionDate(collection: DataListProps[]) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection.map((transaction) => new Date(transaction.date).getTime())
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(DATA_KEY);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "income") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    const transactionReversed = transactionsFormatted.reverse();
    setTransactions(transactionReversed);

    const lastTransactionEntries = getLastTransactionDateByType(
      transactions,
      "income"
    );
    const lastTransactionExpansives = getLastTransactionDateByType(
      transactions,
      "outcome"
    );

    const firstTransactionDate = getFirstTransactionDate(transactions);
    const lastTransactionDate = getLastTransactionDate(transactions);
    const totalInterval = firstTransactionDate + " à " + lastTransactionDate;

    setHighlightData({
      entries: {
        amount: entriesTotal,
        lastTransaction: `${lastTransactionEntries}`,
        isExist: entriesTotal > 0,
      },
      expensive: {
        amount: expensiveTotal,
        lastTransaction: `${lastTransactionExpansives}`,
        isExist: expensiveTotal > 0,
      },
      total: {
        amount: entriesTotal - expensiveTotal,
        lastTransaction: totalInterval,
        isExist: true,
      },
    });

    setIsLoading(false);
  }

  function handleSignOut() {
    Alert.alert(
      "Sair",
      "Deseja realmente sair do aplicativo?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => signOut(),
        },
      ],
      { cancelable: false }
    );
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={user.photo ? { uri: user.photo } : defaultUserPhoto}
                />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name }</UserName>
                </User>
              </UserInfo>

              <ButtonsWrapper>
                {SET_CLEAR_DATA_BUTTON && (
                  <LogoutButton onPress={clearDataStorage}>
                    <Icon name="trash" />
                  </LogoutButton>
                )}
                <LogoutButton onPress={handleSignOut}>
                  <Icon name="power" />
                </LogoutButton>
              </ButtonsWrapper>
            </UserWrapper>
          </Header>

          <HighlightCards>
            {highlightData.entries?.isExist && (
              <HighlightCard
                type="up"
                title="Entradas"
                amount={formatCurrency(highlightData.entries.amount)}
                lastTransaction={`Última entrada dia ${highlightData.entries.lastTransaction}`}
              />
            )}
            {highlightData.expensive?.isExist && (
              <HighlightCard
                type="down"
                title="Saídas"
                amount={formatCurrency(highlightData.expensive.amount)}
                lastTransaction={`Última saída dia ${highlightData.expensive.lastTransaction}`}
              />
            )}
            <HighlightCard
              type="total"
              title="Total"
              amount={formatCurrency(highlightData.total?.amount)}
              lastTransaction={
                highlightData.total?.amount !== 0
                  ? highlightData.total?.lastTransaction
                  : "Não há transações"
              }
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              ListEmptyComponent={
                <EmptyList>Nenhuma entrada foi encontrada.</EmptyList>
              }
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
