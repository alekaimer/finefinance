# Go Finance (v1.0.0)

## Para instalar o Expo CLI:
```
npm install --global expo-cli
```

## Ambiente de desenvolvimento:
```
yarn start
```

## EASDevBuilder:

Para gerar um instalável:
```
npm install --global eas-cli
eas build -p android --profile preview
```
<br />

## Testes unitários:
```
yarn test
```

Desenvolvimento com testes:

Todos os testes no modo watchAll
```
yarn test:w
```

Testes no modo watch (apenas em arquivos com alterações )
```
yarn test:wo
```

### Relatório de cobertura de teste unitários:

Uma nova pasta será criada (./coverage/) na raiz do projeto.
```
yarn test:coverage
```
<br />

## Testes de ponta a ponta (e2e)

Altere os nomes dos emuladores utilizados para android e iOS no arquivo .detoxrc.js

Primeiro execute o Metro bundle:
```
yarn e2e:start
```

Depois:

Para iOS debug
```
yarn detox test -c ios.sim.debug
```
Para iOS release
```
yarn detox test -c ios.sim.release
```
Para Android debug
```
yarn detox test -c android.emu.debug
```
Para Android release
```
yarn detox test -c android.emu.debug
```
Para listar emuladores iOS instalados:
```
xcrun simctl list devicetypes
```
Para listar emuladores Android instalados:
```
emulator -list-avds
```

Caso necessite gerar um build do projeto para executar os testes de ponta a ponta (e2e):

iOS:
```
yarn detox build --configuration ios.sim.debug

ou

yarn detox build --configuration ios.sim.release
```
Android:
```
yarn detox build --configuration android.emu.debug

ou

yarn detox build --configuration android.emu.release
```