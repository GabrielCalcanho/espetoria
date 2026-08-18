// Dados do cardápio — informativo (sem preços)
// Apenas nomes e observações relevantes

const menuData = {
  comidas: {
    carnes: {
      nome: "Carnes",
      imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80",
      imagemAlt: "Carnes grelhadas servidas em tábua",
      itens: [
        {
          nome: "Costelinha Suína com Molho Barbecue",
          observacao: "Molho barbecue"
        },
        {
          nome: "Picanha",
          observacao: "Serve 2 pessoas"
        },
        {
          nome: "Contra Filé",
          observacao: "Serve 2 pessoas"
        },
        {
          nome: "Churrasco Misto",
          observacao: "Serve 2 pessoas"
        },
        {
          nome: "Filé de Frango Grelhado",
          observacao: "Serve 2 pessoas"
        }
      ]
    },
    pizzasSalgadas: {
      nome: "Pizzas Salgadas",
      imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80",
      imagemAlt: "Pizza recém-preparada",
      itens: [
        { nome: "4 Queijos" },
        { nome: "Lombinho Canadense" },
        { nome: "Carbonara" },
        { nome: "Portuguesa" },
        { nome: "Camarão Especial" },
        { nome: "Frango com Catupiry" },
        { nome: "Calabresa" }
      ]
    },
    pizzasDoces: {
      nome: "Pizzas Doces",
      itens: [
        { nome: "Banana com Canela" },
        { nome: "Banana com Chocolate" },
        { nome: "Morango com Nutella" }
      ]
    },
    petiscos: {
      nome: "Petiscos",
      itens: [
        { nome: "Batata Frita Simples", observacao: "400g" },
        { nome: "Batata Frita Turbinada" },
        { nome: "Bolinho de Bacalhau", observacao: "12 unidades" },
        { nome: "Bolinho de Feijoada", observacao: "12 unidades" },
        { nome: "Camarão Empanado", observacao: "500g" },
        { nome: "Gurjão de Peixe", observacao: "400g" },
        { nome: "Isca de Frango", observacao: "400g" },
        { nome: "Carne Seca com Aipim Frito", observacao: "400g" },
        { nome: "Croquete de Carne", observacao: "12 unidades" }
      ]
    },
    hamburgers: {
      nome: "Hambúrgueres Artesanais",
      itens: [
        { nome: "Espetoria Burger" },
        { nome: "Espetoria X-Burger" },
        { nome: "Espetoria Bacon Burger" }
      ]
    },
    batataRecheada: {
      nome: "Batata Recheada",
      itens: [
        {
          nome: "Strogonoff de Camarão",
          observacao: "Serve 1 pessoa · Serve 2 pessoas"
        },
        {
          nome: "Strogonoff de Carne",
          observacao: "Serve 1 pessoa · Serve 2 pessoas"
        },
        {
          nome: "Strogonoff de Frango",
          observacao: "Serve 1 pessoa · Serve 2 pessoas"
        }
      ]
    },
    espetinhos: {
      nome: "Espetinhos",
      intro: "Todos os espetinhos acompanham molho e farofa.",
      itens: [
        { nome: "Carne" },
        { nome: "Frango" },
        { nome: "Coração" },
        { nome: "Linguiça Toscana" },
        { nome: "Medalhão Suíno" },
        { nome: "Copa Lombo" }
      ]
    },
    lanches: {
      nome: "Lanches",
      itens: [
        { nome: "Pão na Chapa" },
        { nome: "Misto Quente" },
        { nome: "Pão com Ovo" },
        { nome: "Pão com Linguiça e Queijo" }
      ]
    }
  },
  bebidas: {
    naoAlcoolicas: {
      nome: "Não Alcoólicas",
      itens: [
        { nome: "Água de Coco" },
        { nome: "Água com Gás" },
        { nome: "Água sem Gás" },
        { nome: "Refrigerante Lata" },
        { nome: "H2O e Limoneto" },
        { nome: "Coca-Cola 600ml" },
        { nome: "Jarra de Suco 750ml" },
        { nome: "Jarra de Suco 1,5L" },
        { nome: "Guaravita" },
        { nome: "Guaraviton" },
        { nome: "Gatorade" },
        { nome: "Red Bull" },
        { nome: "Copo de Suco" },
        { nome: "Del Valle TP" },
        { nome: "Tônica" },
        { nome: "Coca-Cola 2L" }
      ]
    },
    vinhos: {
      nome: "Vinhos",
      itens: [
        { nome: "Casal Garcia" },
        { nome: "Casillero del Diablo" },
        { nome: "Periquita" },
        { nome: "Taça Nacional" },
        { nome: "Taça Importada" }
      ]
    },
    whisky: {
      nome: "Whisky",
      itens: [
        { nome: "Red Label 1L" },
        { nome: "Red Label — Dose" },
        { nome: "Black Label" },
        { nome: "Black Label — Dose" },
        { nome: "Double Black" },
        { nome: "Double Black — Dose" }
      ]
    },
    gin: {
      nome: "Gin",
      itens: [
        { nome: "Gin Tanqueray" },
        { nome: "Gin Tanqueray — Dose" }
      ]
    },
    cervejas: {
      nome: "Cervejas",
      itens: [
        { nome: "Chopp Brahma" },
        { nome: "Chopp Vinho" },
        { nome: "Budweiser Long Neck" },
        { nome: "Stella Artois Long Neck" },
        { nome: "Heineken Long Neck" },
        { nome: "Corona Long Neck" },
        { nome: "Brahma Latão" },
        { nome: "Heineken Latão" },
        { nome: "Antarctica Latão" }
      ]
    },
    drinks: {
      nome: "Drinks",
      imagem: "https://images.unsplash.com/photo-1514362545857-3bc165247c3a?w=900&q=80",
      imagemAlt: "Drinks e coquetéis",
      itens: [
        { nome: "Caipirinha" },
        { nome: "Caipivodka" },
        { nome: "Drinks Diversos" }
      ]
    },
    quentes: {
      nome: "Bebidas Quentes",
      itens: [
        { nome: "Cafezinho" },
        { nome: "Média de Café" },
        { nome: "Café com Leite" },
        { nome: "Capuccino" },
        { nome: "Café Expresso" },
        { nome: "Chocolate" }
      ]
    }
  }
};

// Destaques editoriais (sem preços)
const destaques = [
  {
    nome: "Picanha",
    observacao: "Serve 2 pessoas",
    categoria: "Carnes"
  },
  {
    nome: "Costelinha Suína com Molho Barbecue",
    observacao: "Molho barbecue",
    categoria: "Carnes"
  },
  {
    nome: "Camarão Especial",
    categoria: "Pizzas"
  },
  {
    nome: "Morango com Nutella",
    categoria: "Pizzas Doces"
  },
  {
    nome: "Caipirinha",
    categoria: "Drinks"
  }
];
