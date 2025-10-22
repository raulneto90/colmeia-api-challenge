# 🚀 Colmeia API Challenge

API REST para gerenciamento de clientes e cobranças com suporte a múltiplos métodos de pagamento (PIX, Cartão de Crédito e Boleto).

## 📋 Descrição

Sistema desenvolvido com NestJS, Prisma ORM e PostgreSQL seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**. A API permite criar clientes e gerenciar cobranças com diferentes formas de pagamento de maneira polimórfica.

## ✨ Features

### 👥 Gerenciamento de Clientes
- ✅ Criação de clientes com validação de dados
- ✅ Validação de email e documento únicos
- ✅ Estrutura DDD com separação de camadas

### 💰 Gerenciamento de Cobranças
- ✅ Suporte a múltiplos métodos de pagamento:
  - **PIX**: Chave PIX e QR Code
  - **Cartão de Crédito**: Parcelamento, últimos dígitos e bandeira
  - **Boleto**: Código de barras e data de vencimento
- ✅ Estados de cobrança: PENDING, PAID, FAILED, EXPIRED, CANCELLED
- ✅ Validação de cliente antes da criação
- ✅ Design polimórfico no banco de dados

## 🏗️ Arquitetura

O projeto segue **Clean Architecture** com **DDD**, organizado em camadas:

```
src/
├── modules/
│   ├── customers/
│   │   ├── domain/           # Entidades e regras de negócio
│   │   ├── application/      # Casos de uso
│   │   ├── infrastructure/   # Implementação de repositórios
│   │   ├── interfaces/       # Controllers e DTOs
│   │   └── mappers/          # Conversores de dados
│   └── charges/
│       ├── domain/           # Entidades polimórficas
│       ├── application/      # Casos de uso
│       ├── infrastructure/   # Repositórios com lógica polimórfica
│       ├── interfaces/       # Controllers com Swagger
│       └── mappers/          # Mapeamento de dados
├── config/
│   ├── errors/               # Tratamento de erros
│   └── swagger/              # Configuração do Swagger
└── prisma/
    ├── schema.prisma         # Schema do banco
    └── migrations/           # Migrações

## 🛠️ Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[Fastify](https://www.fastify.io/)** - Web framework de alta performance
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação de schemas com TypeScript
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação de API
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[Biome](https://biomejs.dev/)** - Linter e formatador

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** ou **yarn**

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <repository-url>
cd colmeia-api-challenge
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/colmeia_db?schema=public"

# Application
PORT=3000
NODE_ENV=development
```

### 4. Configure o banco de dados

```bash
# Criar o banco de dados (se necessário)
docker-compose up -d

# Executar as migrações
npx prisma migrate dev

# (Opcional) Visualizar o banco com Prisma Studio
npx prisma studio
```

### 5. Execute a aplicação

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação interativa do Swagger em:

```
http://localhost:3000/docs
```

### Endpoints Disponíveis

#### Clientes

- **POST /customers** - Criar novo cliente
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "11999999999",
    "document": "12345678901"
  }
  ```

#### Cobranças

- **POST /charges** - Criar nova cobrança

  **PIX:**
  ```json
  {
    "customerId": "uuid",
    "amount": 100.50,
    "paymentMethod": "PIX",
    "paymentData": {
      "pixKey": "11999999999",
      "qrCode": "00020126580014br.gov.bcb.pix..."
    }
  }
  ```

  **Cartão de Crédito:**
  ```json
  {
    "customerId": "uuid",
    "amount": 300.00,
    "paymentMethod": "CREDIT_CARD",
    "paymentData": {
      "installments": 3,
      "lastDigits": "1234",
      "cardBrand": "Visa"
    }
  }
  ```

  **Boleto:**
  ```json
  {
    "customerId": "uuid",
    "amount": 200.00,
    "paymentMethod": "BOLETO",
    "paymentData": {
      "barcode": "23793381286000000100641772301027659340000010000",
      "dueDate": "2025-11-22T00:00:00.000Z"
    }
  }
  ```

## 🧪 Testes

O projeto possui uma suite completa de testes unitários com **97.22% de cobertura**.

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:cov

# Executar interface visual do Vitest
npm run test:ui
```

### Estrutura de Testes

- ✅ **30 testes** unitários
- ✅ **9 arquivos** de teste
- ✅ Cobertura de:
  - Entidades de domínio
  - Factories
  - Use Cases
  - Mappers
  - Validações

```
Tests Suites:
├── Customers
│   ├── customer.entity.spec.ts (3 testes)
│   ├── create-customer.usecase.spec.ts (2 testes)
│   └── customer.mapper.spec.ts (2 testes)
└── Charges
    ├── pix-charge.entity.spec.ts (3 testes)
    ├── credit-card-charge.entity.spec.ts (2 testes)
    ├── boleto-charge.entity.spec.ts (1 teste)
    ├── charge.factory.spec.ts (5 testes)
    ├── create-charge.usecase.spec.ts (4 testes)
    └── charge.mapper.spec.ts (8 testes)
```

## 🎯 Padrões de Projeto Utilizados

### 1. **Factory Pattern**
- `ChargeFactory`: Cria instâncias de cobranças baseado no método de pagamento
- Encapsula a lógica de criação de objetos polimórficos

### 2. **Repository Pattern**
- Abstração da camada de persistência
- Interfaces no domínio, implementações na infraestrutura
- `CustomersRepository`, `ChargesRepository`

### 3. **Mapper Pattern**
- Converte dados entre camadas (Prisma ↔ Domain ↔ DTO)
- `CustomerMapper`, `ChargeMapper`
- Mantém as camadas desacopladas

### 4. **Use Case Pattern**
- Encapsula regras de negócio
- Uma responsabilidade por caso de uso
- `CreateCustomerUseCase`, `CreateChargeUseCase`

### 5. **Dependency Injection**
- Inversão de controle via NestJS
- Facilita testes e manutenção

## 🗄️ Modelo de Dados

### Polimorfismo de Cobranças

O sistema utiliza **Single Table Inheritance** a nível de aplicação com tabelas separadas no banco:

```
Charge (tabela principal)
├── PIX → PixCharge (tabela)
├── CREDIT_CARD → CreditCardCharge (tabela)
└── BOLETO → BoletoCharge (tabela)
```

**Vantagens:**
- ✅ Integridade referencial
- ✅ Queries eficientes
- ✅ Facilita adição de novos métodos
- ✅ Validações específicas por tipo

## 🔍 Validações

### Validação em Camadas

1. **DTO Layer (Zod)**
   - Validação de tipos
   - Formato de dados
   - Discriminated unions para polimorfismo

2. **Use Case Layer**
   - Regras de negócio
   - Validação de existência (ex: cliente existe?)
   - Validação de unicidade (ex: email duplicado)

3. **Domain Layer**
   - Invariantes de domínio
   - Lógica de entidade

## 🚢 Deploy

### Docker (Recomendado)

```bash
# Build da imagem
docker build -t colmeia-api .

# Run com docker-compose
docker-compose up -d
```

### Manual

```bash
# Build
npm run build

# Run migrations
npx prisma migrate deploy

# Start
npm run start:prod
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev        # Inicia em modo watch
npm run start:debug      # Inicia com debug

# Build
npm run build            # Compila o projeto

# Testes
npm run test             # Executa testes unitários
npm run test:watch       # Testes em modo watch
npm run test:cov         # Cobertura de testes
npm run test:ui          # Interface visual dos testes

# Prisma
npx prisma studio        # Interface visual do banco
npx prisma migrate dev   # Cria nova migration
npx prisma generate      # Gera Prisma Client

# Code Quality
npm run lint             # Executa biome check
npm run format           # Formata código
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido como parte do desafio técnico Colmeia.
