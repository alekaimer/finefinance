import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import TransactionTypeButton from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { DATA_KEY } from "../../config/consts"
interface FormData {
  [key: string]: string;
}

export function Register() {
  const { navigate } = useNavigation();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number()
      .typeError("Informe um valor numérico")
      .positive("O valor não pode ser negativo")
      .required("Preço é obrigatório"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handletransactionsTypesSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function clearForm() {
    setCategory({
      key: "category",
      name: "Categoria",
    });

    setTransactionType("");

    reset();
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const { name, amount } = form;
    const newTransaction = {
      id: uuid.v4().toString(),
      name,
      amount,
      transactionType,
      category: category.key,
      date: new Date(),
      type: transactionType,
    };

    try {
      const data = await AsyncStorage.getItem(DATA_KEY);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(dataFormatted));

      clearForm();

      //@ts-ignore
      navigate("Listagem");
    } catch (error) {
      // console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  // useFocusEffect(() => {
    // async function loadData() {
    //   const data = await AsyncStorage.getItem(DATA_KEY);
    //   console.log("Storage:", JSON.parse(data!));
    // }
    // loadData();

    // async function clearData() {
    //   await AsyncStorage.removeItem(DATA_KEY);
    //   const currentData = await AsyncStorage.getItem(DATA_KEY);
    // }
    // clearData();
  // });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              error={errors.name && errors.name.message}
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
            />
            <InputForm
              control={control}
              name="amount"
              error={errors.amount && errors.amount.message}
              placeholder="Preço"
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Entrada"
                type="income"
                onPress={() => handletransactionsTypesSelect("income")}
                isActive={transactionType === "income"}
              />
              <TransactionTypeButton
                title="Saída"
                type="outcome"
                onPress={() => handletransactionsTypesSelect("outcome")}
                isActive={transactionType === "outcome"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          {/* <Button title="Clear Data" onPress={clearData} /> */}
        </Form>

        <Modal visible={categoryModalOpen} statusBarTranslucent>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
