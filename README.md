# Gympoint

## Inicializando servidor

- `cd server`
- `yarn dev` (inicializar servidor)
- `yarn queue` (inicializar serviço de fila de envio de emails);

## Inicializando Web

- `cd web`
- `yarn start`

## Inicializando mobile

- `cd mobile`
- `react-native run-ios` / `react-native run-android`

A unica diferença entre as plataformas seria a troca do `localhost` por `10.0.2.2` na config do axios (src/services/api.js).
