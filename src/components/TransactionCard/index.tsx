import React, { useEffect } from "react";
import { ViewProps } from "react-native";
import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export interface TransactionCardProps {
  type: "income" | "outcome";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props extends ViewProps {
  data: TransactionCardProps;
}

export function TransactionCard({ data, ...props }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container type={data.type} {...props}>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === "outcome" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
