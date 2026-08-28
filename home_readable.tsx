import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/Home.tsx");import __vite__cjsImport0_react_jsxDevRuntime from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=99883b16"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
var _s = $RefreshSig$(), _s2 = $RefreshSig$();
import __vite__cjsImport1_react from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/react.js?v=99883b16"; const useMemo = __vite__cjsImport1_react["useMemo"]; const useState = __vite__cjsImport1_react["useState"];
import {
  ArrowRight,
  Check,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  X
} from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/lucide-react.js?v=87dfaebb";
import { toast } from "/@fs/home/ubuntu/nauj-doceria-redesign/node_modules/.vite/deps/sonner.js?v=df0ef0a5";
const WHATSAPP_NUMBER = "5521976846682";
const products = [
  {
    id: "pastel-ninho",
    category: "Pastéis",
    name: "Pastel de Leite Ninho com Nutella",
    description: "Massa artesanal de Leite Ninho recheada com Nutella cremosa.",
    price: 17.99,
    image: "/manus-storage/nauj-hero-pastel_32d18992.jpg",
    alt: "Pastel aberto com recheio cremoso de leite Ninho e Nutella",
    options: ["Sem morango", "Com morango (+R$ 2,00)"]
  },
  {
    id: "acai-300",
    category: "Açaí",
    name: "Açaí de Garrafa 300 ml",
    description: "Açaí cremoso, geladinho e cheio de sabor.",
    price: 21.99,
    image: "/manus-storage/nauj-product-acai_544057b5.jpg",
    alt: "Copo de açaí com frutas frescas"
  },
  {
    id: "acai-500",
    category: "Açaí",
    name: "Açaí de Garrafa 500 ml",
    description: "Cremoso, refrescante e na medida certa.",
    price: 26.99,
    image: "/manus-storage/nauj-product-acai_544057b5.jpg",
    alt: "Copo grande de açaí com banana e morango"
  },
  {
    id: "batida-300",
    category: "Batidas",
    name: "Batida Alcoólica 300 ml",
    description: "Batida cremosa e refrescante com fruta selecionada.",
    price: 21.99,
    image: "/manus-storage/nauj-product-acai_544057b5.jpg",
    alt: "Bebida cremosa de frutas em copo transparente",
    options: ["Morango", "Maracujá"],
    ageRestricted: true
  },
  {
    id: "batida-500",
    category: "Batidas",
    name: "Batida Alcoólica 500 ml",
    description: "A mesma cremosidade em uma versão maior.",
    price: 26.99,
    image: "/manus-storage/nauj-product-acai_544057b5.jpg",
    alt: "Bebida cremosa de frutas em tamanho grande",
    options: ["Morango", "Maracujá"],
    ageRestricted: true
  },
  {
    id: "coxinha-camarao",
    category: "Salgados",
    name: "Coxinha de Camarão com Catupiry®",
    description: "Massa leve e crocante, recheada com camarão e Catupiry®.",
    price: 17.99,
    image: "/manus-storage/nauj-product-coxinha_4d37328e.jpg",
    alt: "Coxinha dourada aberta com recheio cremoso de camarão",
    options: ["Camarão", "Costela", "Salmão"]
  }
];
const featuredIds = ["pastel-ninho", "acai-500", "coxinha-camarao"];
const categories = ["Todos", "Pastéis", "Açaí", "Batidas", "Salgados"];
function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
export default function Home() {
  _s();
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const visibleProducts = useMemo(
    () => category === "Todos" ? products : products.filter((product) => product.category === category),
    [category]
  );
  const cartDetails = cart.map((line) => ({
    line,
    product: products.find((product) => product.id === line.id)
  }));
  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cartDetails.reduce((total, { line, product }) => total + product.price * line.quantity, 0);
  function addToCart(productId, option) {
    setCart((current) => {
      const existing = current.find((line) => line.id === productId && line.option === option);
      if (existing) {
        return current.map(
          (line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...current, { id: productId, quantity: 1, option }];
    });
    toast.success("Adicionado ao seu pedido", { description: "Você pode revisar tudo na sacola." });
  }
  function changeQuantity(target, delta) {
    setCart(
      (current) => current.map(
        (line) => line === target ? { ...line, quantity: line.quantity + delta } : line
      ).filter((line) => line.quantity > 0)
    );
  }
  function sendWhatsApp() {
    const message = cartDetails.length ? `Olá! Gostaria de fazer este pedido na Nauj Doceria:%0A%0A${cartDetails.map(({ line, product }) => `${line.quantity}x ${product.name}${line.option ? ` — ${line.option}` : ""}`).join("%0A")} %0A%0ATotal estimado: ${money(cartTotal)}%0A%0APode me informar as opções de entrega e pagamento?` : "Olá! Vim pelo cardápio da Nauj Doceria e gostaria de fazer um pedido.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  }
  function scrollToMenu() {
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:146", className: "min-h-screen overflow-x-hidden bg-[#fff8f1] text-[#3c211c]", children: [
    /* @__PURE__ */ jsxDEV("header", { "data-loc": "client/src/pages/Home.tsx:147", className: "sticky top-0 z-40 border-b border-[#3c211c]/10 bg-[#fff8f1]/95 backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:148", className: "mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8", children: [
        /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:149", href: "#inicio", className: "group flex items-center gap-3", "aria-label": "Nauj Doceria, início", children: [
          /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:150", src: "/manus-storage/nauj-brand-mark_ca7c8839.png", alt: "", className: "h-11 w-11 object-contain" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:151", className: "leading-none", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:152", className: "block font-display text-[27px] tracking-[-0.06em]", children: "nauj" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 152,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:153", className: "block pl-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b5a4f]", children: "doceria" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 151,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("nav", { "data-loc": "client/src/pages/Home.tsx:157", className: "hidden items-center gap-8 text-sm font-medium text-[#68453d] md:flex", "aria-label": "Navegação principal", children: [
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:158", className: "nav-link active", href: "#inicio", children: "Início" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 158,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:159", className: "nav-link", href: "#cardapio", children: "Cardápio" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:160", className: "nav-link", href: "#como-pedir", children: "Como pedir" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:161", className: "nav-link", href: "#contato", children: "Contato" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:164", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:165", className: "hidden button-primary sm:flex", onClick: sendWhatsApp, children: [
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:166", className: "text-lg", children: "◔" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, this),
            " Pedir pelo WhatsApp"
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 165,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:168", className: "relative rounded-full p-2 text-[#3c211c] transition hover:bg-[#f2b5aa]/25 md:hidden", onClick: () => setMobileMenu(!mobileMenu), "aria-label": "Abrir menu", children: mobileMenu ? /* @__PURE__ */ jsxDEV(X, { "data-loc": "client/src/pages/Home.tsx:169", size: 24 }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 169,
            columnNumber: 29
          }, this) : /* @__PURE__ */ jsxDEV(Menu, { "data-loc": "client/src/pages/Home.tsx:169", size: 24 }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 169,
            columnNumber: 88
          }, this) }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 168,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 164,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      mobileMenu && /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:174", className: "border-t border-[#3c211c]/10 bg-[#fff8f1] px-5 py-4 md:hidden", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:175", className: "flex flex-col gap-4 text-sm font-semibold", children: [
        /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:176", href: "#inicio", onClick: () => setMobileMenu(false), children: "Início" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 176,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:177", href: "#cardapio", onClick: () => setMobileMenu(false), children: "Cardápio" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 177,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:178", href: "#como-pedir", onClick: () => setMobileMenu(false), children: "Como pedir" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 178,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:179", href: "#contato", onClick: () => setMobileMenu(false), children: "Contato" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 179,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:180", className: "button-primary w-full", onClick: sendWhatsApp, children: "Pedir pelo WhatsApp" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 180,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 175,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("main", { "data-loc": "client/src/pages/Home.tsx:186", children: [
      /* @__PURE__ */ jsxDEV("section", { "data-loc": "client/src/pages/Home.tsx:187", id: "inicio", className: "relative mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pt-12 lg:pb-20 lg:pt-16", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:188", className: "hero-grid hero-grid--text-only overflow-hidden rounded-[2rem] bg-[#faeee4] shadow-[0_24px_60px_rgba(91,45,32,0.10)]", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:189", className: "relative flex flex-col items-center justify-center px-7 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:190", className: "mb-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#d96f55]", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { "data-loc": "client/src/pages/Home.tsx:190", size: 15 }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 190,
            columnNumber: 163
          }, this),
          " Feito para adoçar seu dia"
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { "data-loc": "client/src/pages/Home.tsx:191", className: "max-w-3xl font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.98] tracking-[-0.065em] text-[#3c211c]", children: [
          "Seu momento ",
          /* @__PURE__ */ jsxDEV("em", { "data-loc": "client/src/pages/Home.tsx:191", className: "not-italic text-[#d96f55]", children: "mais gostoso" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 191,
            columnNumber: 187
          }, this),
          " começa aqui."
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 191,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:192", className: "mt-6 max-w-xl text-base leading-7 text-[#76584f] sm:text-lg", children: "Doces, açaí e salgados preparados com carinho para transformar uma pausa qualquer em um momento especial." }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 192,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:193", className: "mt-8 flex flex-wrap items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:194", className: "button-primary", onClick: scrollToMenu, children: [
            "Ver cardápio ",
            /* @__PURE__ */ jsxDEV(ArrowRight, { "data-loc": "client/src/pages/Home.tsx:194", size: 17 }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 194,
              columnNumber: 129
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:195", className: "flex items-center gap-2 text-sm font-semibold text-[#76584f]", children: [
            /* @__PURE__ */ jsxDEV(Truck, { "data-loc": "client/src/pages/Home.tsx:195", size: 18, className: "text-[#d96f55]" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 195,
              columnNumber: 137
            }, this),
            " Entrega e retirada"
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 195,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:197", className: "mt-9 flex items-center gap-3 text-xs text-[#987b70]", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:197", className: "h-px w-8 bg-[#d96f55]" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 197,
            columnNumber: 125
          }, this),
          " Ingredientes selecionados · carinho em cada detalhe ",
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:197", className: "h-px w-8 bg-[#d96f55]" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 197,
            columnNumber: 261
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 197,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 189,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 188,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { "data-loc": "client/src/pages/Home.tsx:202", className: "mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:203", className: "mb-7 flex items-end justify-between gap-5", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:204", children: [
            /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:204", className: "eyebrow", children: "Para começar bem" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 204,
              columnNumber: 59
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { "data-loc": "client/src/pages/Home.tsx:204", className: "section-title", children: [
              "Mais pedidos ",
              /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:204", className: "leaf-mark", children: "✿" }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 204,
                columnNumber: 227
              }, this)
            ] }, void 0, true, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 204,
              columnNumber: 143
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 204,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:205", className: "text-sm font-bold text-[#d96f55] transition hover:translate-x-1", onClick: scrollToMenu, children: [
            "Ver todos ",
            /* @__PURE__ */ jsxDEV(ArrowRight, { "data-loc": "client/src/pages/Home.tsx:205", size: 16, className: "ml-1 inline" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 205,
              columnNumber: 171
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:207", className: "grid gap-4 md:grid-cols-3", children: featuredIds.map((id) => {
          const product = products.find((item) => item.id === id);
          return /* @__PURE__ */ jsxDEV(FeaturedCard, { "data-loc": "client/src/pages/Home.tsx:210", product, onAdd: addToCart }, product.id, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 210,
            columnNumber: 22
          }, this);
        }) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 207,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 202,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { "data-loc": "client/src/pages/Home.tsx:215", id: "cardapio", className: "border-y border-[#3c211c]/8 bg-[#fffdf9] px-5 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:216", className: "mx-auto max-w-7xl", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:217", className: "mb-10 max-w-xl", children: [
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:217", className: "eyebrow", children: "Escolha seu favorito" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 217,
            columnNumber: 86
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { "data-loc": "client/src/pages/Home.tsx:217", className: "section-title", children: "Nosso cardápio" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 217,
            columnNumber: 174
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:217", className: "mt-4 leading-7 text-[#80645a]", children: "Uma seleção feita para compartilhar — ou guardar só para você." }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 217,
            columnNumber: 264
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:218", className: "category-scroller mb-10 flex gap-2 overflow-x-auto pb-2", role: "tablist", "aria-label": "Categorias do cardápio", children: categories.map((item) => /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:219", role: "tab", "aria-selected": category === item, className: `category-chip ${category === item ? "selected" : ""}`, onClick: () => setCategory(item), children: item }, item, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 219,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:221", className: "grid gap-4 lg:grid-cols-2", children: visibleProducts.map((product, index) => /* @__PURE__ */ jsxDEV(ProductCard, { "data-loc": "client/src/pages/Home.tsx:222", product, index, onAdd: addToCart }, product.id, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 222,
          columnNumber: 56
        }, this)) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 221,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 215,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { "data-loc": "client/src/pages/Home.tsx:227", id: "como-pedir", className: "mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:228", className: "how-grid overflow-hidden rounded-[2rem] bg-[#ead7c8]", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:229", className: "relative min-h-[290px] overflow-hidden sm:min-h-[380px]", children: [
          /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:229", src: "/manus-storage/nauj-product-coxinha_4d37328e.jpg", alt: "Coxinha de camarão dourada", className: "absolute inset-0 h-full w-full object-cover" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 229,
            columnNumber: 127
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:229", className: "absolute inset-0 bg-gradient-to-t from-[#3c211c]/40 to-transparent" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 229,
            columnNumber: 319
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 229,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:230", className: "flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16", children: [
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:230", className: "eyebrow text-[#b75b47]", children: "Do seu jeito" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 230,
            columnNumber: 129
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { "data-loc": "client/src/pages/Home.tsx:230", className: "section-title max-w-md", children: "Pedir é simples, gostoso e sem complicação." }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 230,
            columnNumber: 224
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:230", className: "mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1", children: [["01", "Escolha", "Encontre seus favoritos no cardápio."], ["02", "Monte", "Adicione os itens e preferências."], ["03", "Receba", "Finalize pelo WhatsApp e combine tudo."]].map(([number, title, copy]) => /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:230", className: "flex gap-4", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:230", className: "font-display text-2xl text-[#d96f55]", children: number }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 230,
              columnNumber: 744
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:230", children: [
              /* @__PURE__ */ jsxDEV("h3", { "data-loc": "client/src/pages/Home.tsx:230", className: "font-bold", children: title }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 230,
                columnNumber: 901
              }, this),
              /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:230", className: "mt-1 text-sm leading-6 text-[#76584f]", children: copy }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 230,
                columnNumber: 980
              }, this)
            ] }, void 0, true, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 230,
              columnNumber: 855
            }, this)
          ] }, number, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 230,
            columnNumber: 662
          }, this)) }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 230,
            columnNumber: 352
          }, this),
          /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:230", className: "button-primary mt-9 w-fit", onClick: sendWhatsApp, children: [
            "Começar meu pedido ",
            /* @__PURE__ */ jsxDEV(ArrowRight, { "data-loc": "client/src/pages/Home.tsx:230", size: 17 }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 230,
              columnNumber: 1233
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 230,
            columnNumber: 1104
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 230,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 228,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 227,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { "data-loc": "client/src/pages/Home.tsx:234", id: "contato", className: "border-t border-[#3c211c]/8 bg-[#f8ede3] px-5 py-14 sm:px-8", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:234", className: "mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:234", children: [
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:234", className: "eyebrow", children: "Estamos por aqui" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 234,
            columnNumber: 330
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { "data-loc": "client/src/pages/Home.tsx:234", className: "font-display text-3xl tracking-[-0.04em]", children: "Seu próximo desejo está a um clique." }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 234,
            columnNumber: 414
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 234,
          columnNumber: 284
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:234", className: "flex flex-wrap gap-6 text-sm font-semibold text-[#68453d]", children: [
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:234", href: "tel:+5521976846682", className: "contact-link", children: "+55 21 97684-6682" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 234,
            columnNumber: 675
          }, this),
          /* @__PURE__ */ jsxDEV("a", { "data-loc": "client/src/pages/Home.tsx:234", href: "https://instagram.com/nauj.doceria_", target: "_blank", rel: "noreferrer", className: "contact-link", children: "@nauj.doceria_" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 234,
            columnNumber: 791
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 234,
          columnNumber: 559
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 234,
        columnNumber: 144
      }, this) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 234,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 186,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { "data-loc": "client/src/pages/Home.tsx:237", className: "bg-[#3c211c] px-5 py-10 text-[#fff8f1] sm:px-8", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:237", className: "mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:237", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:237", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:237", src: "/manus-storage/nauj-brand-mark_ca7c8839.png", alt: "", className: "h-10 w-10 brightness-0 invert" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 237,
            columnNumber: 383
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:237", children: [
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:237", className: "block font-display text-3xl tracking-[-0.06em]", children: "nauj" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 237,
              columnNumber: 577
            }, this),
            /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:237", className: "block pl-1 text-[9px] uppercase tracking-[0.28em] text-[#f2b5aa]", children: "doceria" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 237,
              columnNumber: 694
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 237,
            columnNumber: 530
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 237,
          columnNumber: 301
        }, this),
        /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:237", className: "mt-4 max-w-xs text-sm leading-6 text-[#e4cfc3]", children: "Doces, açaí e salgados preparados com carinho." }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 237,
          columnNumber: 845
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 237,
        columnNumber: 255
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:237", className: "text-sm text-[#e4cfc3] sm:text-right", children: [
        /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:237", children: "Atendimento das 11h às 00h" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 237,
          columnNumber: 1099
        }, this),
        /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:237", className: "mt-2", children: "© 2026 Nauj Doceria" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 237,
          columnNumber: 1173
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 237,
        columnNumber: 1004
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 237,
      columnNumber: 115
    }, this) }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 237,
      columnNumber: 7
    }, this),
    cartCount > 0 && /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:239", className: "cart-bar", onClick: () => setCartOpen(true), "aria-label": "Abrir seu pedido", children: [
      /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:239", className: "cart-icon", children: [
        /* @__PURE__ */ jsxDEV(ShoppingBag, { "data-loc": "client/src/pages/Home.tsx:239", size: 21 }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 239,
          columnNumber: 228
        }, this),
        /* @__PURE__ */ jsxDEV("b", { "data-loc": "client/src/pages/Home.tsx:239", children: cartCount }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 239,
          columnNumber: 294
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 239,
        columnNumber: 159
      }, this),
      /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:239", className: "flex-1 text-left", children: [
        /* @__PURE__ */ jsxDEV("strong", { "data-loc": "client/src/pages/Home.tsx:239", children: "Seu pedido" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 239,
          columnNumber: 436
        }, this),
        /* @__PURE__ */ jsxDEV("small", { "data-loc": "client/src/pages/Home.tsx:239", children: money(cartTotal) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 239,
          columnNumber: 504
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 239,
        columnNumber: 360
      }, this),
      /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:239", className: "hidden font-bold sm:inline", children: "Revisar pedido" }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 239,
        columnNumber: 585
      }, this),
      /* @__PURE__ */ jsxDEV(ArrowRight, { "data-loc": "client/src/pages/Home.tsx:239", size: 19 }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 239,
        columnNumber: 692
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 239,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:240", className: `whatsapp-fab ${cartCount > 0 ? "above-cart" : ""}`, onClick: sendWhatsApp, "aria-label": "Pedir pelo WhatsApp", children: [
      "◔",
      /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:240", className: "sr-only", children: "Pedir pelo WhatsApp" }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 240,
        columnNumber: 177
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 240,
      columnNumber: 7
    }, this),
    cartOpen && /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "drawer-backdrop", onClick: () => setCartOpen(false), children: /* @__PURE__ */ jsxDEV("aside", { "data-loc": "client/src/pages/Home.tsx:242", className: "cart-drawer", onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "flex items-center justify-between border-b border-[#3c211c]/10 px-6 py-5", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", children: [
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:242", className: "eyebrow", children: "Quase lá" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 423
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { "data-loc": "client/src/pages/Home.tsx:242", className: "font-display text-3xl", children: "Seu pedido" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 499
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 377
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:242", className: "rounded-full p-2 hover:bg-[#f2b5aa]/25", onClick: () => setCartOpen(false), "aria-label": "Fechar pedido", children: /* @__PURE__ */ jsxDEV(X, { "data-loc": "client/src/pages/Home.tsx:242", size: 21 }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 761
        }, this) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 599
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 242,
        columnNumber: 246
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "flex-1 overflow-y-auto px-6 py-5", children: cartDetails.map(({ line, product }) => /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "border-b border-[#3c211c]/10 py-4 first:pt-0", children: /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "flex gap-4", children: [
        /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:242", src: product.image, alt: "", className: "h-20 w-20 rounded-2xl object-cover" }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 1169
        }, this),
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxDEV("h3", { "data-loc": "client/src/pages/Home.tsx:242", className: "font-bold leading-5", children: product.name }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 1364
          }, this),
          line.option && /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:242", className: "mt-1 text-sm text-[#8b6b61]", children: line.option }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 1476
          }, this),
          /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "mt-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("strong", { "data-loc": "client/src/pages/Home.tsx:242", className: "text-[#d96f55]", children: money(product.price * line.quantity) }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 242,
              columnNumber: 1675
            }, this),
            /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "quantity-control", children: [
              /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:242", onClick: () => changeQuantity(line, -1), "aria-label": "Diminuir quantidade", children: /* @__PURE__ */ jsxDEV(Minus, { "data-loc": "client/src/pages/Home.tsx:242", size: 14 }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 242,
                columnNumber: 1996
              }, this) }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 242,
                columnNumber: 1873
              }, this),
              /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:242", children: line.quantity }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 242,
                columnNumber: 2065
              }, this),
              /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:242", onClick: () => changeQuantity(line, 1), "aria-label": "Aumentar quantidade", children: /* @__PURE__ */ jsxDEV(Plus, { "data-loc": "client/src/pages/Home.tsx:242", size: 14 }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 242,
                columnNumber: 2256
              }, this) }, void 0, false, {
                fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
                lineNumber: 242,
                columnNumber: 2134
              }, this)
            ] }, void 0, true, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 242,
              columnNumber: 1798
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 1578
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 1291
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 242,
        columnNumber: 1100
      }, this) }, `${line.id}-${line.option}`, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 242,
        columnNumber: 963
      }, this)) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 242,
        columnNumber: 832
      }, this),
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "border-t border-[#3c211c]/10 bg-[#fff8f1] px-6 py-5", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:242", className: "mb-4 flex justify-between text-lg font-bold", children: [
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:242", children: "Total estimado" }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 2574
          }, this),
          /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:242", className: "text-[#d96f55]", children: money(cartTotal) }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 2642
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 2472
        }, this),
        /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:242", className: "button-primary w-full justify-center", onClick: sendWhatsApp, children: [
          "Continuar no WhatsApp ",
          /* @__PURE__ */ jsxDEV(ArrowRight, { "data-loc": "client/src/pages/Home.tsx:242", size: 17 }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 242,
            columnNumber: 2890
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 2747
        }, this),
        /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:242", className: "mt-3 text-center text-xs text-[#8b6b61]", children: "A entrega e o pagamento são combinados pelo WhatsApp." }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 242,
          columnNumber: 2964
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 242,
        columnNumber: 2362
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 242,
      columnNumber: 129
    }, this) }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 242,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
    lineNumber: 146,
    columnNumber: 5
  }, this);
}
_s(Home, "APthUNaWDaFSVj09rdvPFYIuC1M=");
_c = Home;
function FeaturedCard({ product, onAdd }) {
  return /* @__PURE__ */ jsxDEV("article", { "data-loc": "client/src/pages/Home.tsx:248", className: "featured-card group", children: [
    /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:248", className: "featured-image", children: [
      /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:248", src: product.image, alt: product.alt }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 248,
        columnNumber: 165
      }, this),
      /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:248", className: "featured-tag", children: "queridinho" }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 248,
        columnNumber: 251
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 248,
      columnNumber: 92
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:248", className: "flex flex-1 flex-col p-5", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:248", className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { "data-loc": "client/src/pages/Home.tsx:248", className: "font-display text-[1.38rem] leading-tight tracking-[-0.03em]", children: product.name }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 248,
          columnNumber: 526
        }, this),
        /* @__PURE__ */ jsxDEV("strong", { "data-loc": "client/src/pages/Home.tsx:248", className: "whitespace-nowrap text-lg text-[#d96f55]", children: money(product.price) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 248,
          columnNumber: 663
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 248,
        columnNumber: 429
      }, this),
      /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:248", className: "mt-2 line-clamp-2 text-sm leading-6 text-[#80645a]", children: product.description }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 248,
        columnNumber: 802
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:248", className: "outline-button mt-5 w-full", onClick: () => onAdd(product.id, product.options?.[0]), children: [
        /* @__PURE__ */ jsxDEV(ShoppingBag, { "data-loc": "client/src/pages/Home.tsx:248", size: 16 }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 248,
          columnNumber: 1078
        }, this),
        " Adicionar"
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 248,
        columnNumber: 934
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 248,
      columnNumber: 346
    }, this)
  ] }, void 0, true, {
    fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
    lineNumber: 248,
    columnNumber: 10
  }, this);
}
_c2 = FeaturedCard;
function ProductCard({ product, index, onAdd }) {
  _s2();
  const [selected, setSelected] = useState(product.options?.[0]);
  return /* @__PURE__ */ jsxDEV("article", { "data-loc": "client/src/pages/Home.tsx:253", className: "product-row animate-in", style: { animationDelay: `${index * 50}ms` }, children: [
    /* @__PURE__ */ jsxDEV("img", { "data-loc": "client/src/pages/Home.tsx:253", src: product.image, alt: product.alt, className: "product-thumb" }, void 0, false, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 253,
      columnNumber: 141
    }, this),
    /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:253", className: "min-w-0 flex-1 py-1", children: [
      /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:253", className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:253", children: [
          /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:253", className: "mb-1 flex items-center gap-2", children: [
            product.ageRestricted && /* @__PURE__ */ jsxDEV("span", { "data-loc": "client/src/pages/Home.tsx:253", className: "age-badge", children: "+18" }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 253,
              columnNumber: 597
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { "data-loc": "client/src/pages/Home.tsx:253", className: "text-lg font-bold leading-6", children: product.name }, void 0, false, {
              fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
              lineNumber: 253,
              columnNumber: 677
            }, this)
          ] }, void 0, true, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 253,
            columnNumber: 484
          }, this),
          /* @__PURE__ */ jsxDEV("p", { "data-loc": "client/src/pages/Home.tsx:253", className: "max-w-xl text-sm leading-6 text-[#80645a]", children: product.description }, void 0, false, {
            fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
            lineNumber: 253,
            columnNumber: 787
          }, this)
        ] }, void 0, true, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 253,
          columnNumber: 438
        }, this),
        /* @__PURE__ */ jsxDEV("strong", { "data-loc": "client/src/pages/Home.tsx:253", className: "whitespace-nowrap text-lg text-[#d96f55]", children: money(product.price) }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 253,
          columnNumber: 916
        }, this)
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 253,
        columnNumber: 331
      }, this),
      product.options && /* @__PURE__ */ jsxDEV("div", { "data-loc": "client/src/pages/Home.tsx:253", className: "mt-4 flex flex-wrap gap-2", children: product.options.map((option) => /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:253", className: `option-chip ${selected === option ? "selected" : ""}`, onClick: () => setSelected(option), children: [
        selected === option && /* @__PURE__ */ jsxDEV(Check, { "data-loc": "client/src/pages/Home.tsx:253", size: 13 }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 253,
          columnNumber: 1381
        }, this),
        option
      ] }, option, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 253,
        columnNumber: 1192
      }, this)) }, void 0, false, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 253,
        columnNumber: 1075
      }, this),
      /* @__PURE__ */ jsxDEV("button", { "data-loc": "client/src/pages/Home.tsx:253", className: "outline-button mt-4", onClick: () => onAdd(product.id, selected), children: [
        /* @__PURE__ */ jsxDEV(Plus, { "data-loc": "client/src/pages/Home.tsx:253", size: 16 }, void 0, false, {
          fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
          lineNumber: 253,
          columnNumber: 1593
        }, this),
        " Adicionar"
      ] }, void 0, true, {
        fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
        lineNumber: 253,
        columnNumber: 1468
      }, this)
    ] }, void 0, true, {
      fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
      lineNumber: 253,
      columnNumber: 253
    }, this)
  ] }, void 0, true, {
    fileName: "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx",
    lineNumber: 253,
    columnNumber: 10
  }, this);
}
_s2(ProductCard, "1DsKWaoPpJDU1jUWAfjjDyHhOA4=");
_c3 = ProductCard;
var _c, _c2, _c3;
$RefreshReg$(_c, "Home");
$RefreshReg$(_c2, "FeaturedCard");
$RefreshReg$(_c3, "ProductCard");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) {
  return RefreshRuntime.register(type, "/home/ubuntu/nauj-doceria-redesign/client/src/pages/Home.tsx " + id);
}
function $RefreshSig$() {
  return RefreshRuntime.createSignatureFunctionForTransform();
}

//# sourceMappingURL=data:application/json;base64,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UUFBUXNCLElBQUksQ0FBQ1UsV0FBVyx1QkFBQyx5REFBb0IsV0FBVyxlQUFlK0IsYUFBYS9CLFNBQVMsYUFBYSxFQUFFLElBQUksU0FBUyxNQUFNZ0MsWUFBWWhDLE1BQU0sR0FBSStCO0FBQUFBLHFCQUFhL0IsVUFBVSx1QkFBQyxzREFBTSxNQUFNLE1BQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFnQjtBQUFBLFFBQUtBO0FBQUFBLFdBQTVKQSxRQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBZ0wsQ0FBUyxLQUFyUTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXVRO0FBQUEsTUFBTyx1QkFBQyx5REFBTyxXQUFVLHVCQUFzQixTQUFTLE1BQU0yQixNQUFNdkMsUUFBUTNCLElBQUlzRSxRQUFRLEdBQUc7QUFBQSwrQkFBQyxxREFBSyxNQUFNLE1BQVo7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFlO0FBQUEsUUFBRztBQUFBLFdBQXRHO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBZ0g7QUFBQSxTQUE1MkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFxM0I7QUFBQSxPQUF0aEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUE0aEM7QUFDcmlDO0FBQUNELElBSFFELGFBQVc7QUFBQUssTUFBWEw7QUFBVyxJQUFBSixJQUFBRyxLQUFBTTtBQUFBQyxhQUFBVixJQUFBO0FBQUFVLGFBQUFQLEtBQUE7QUFBQU8sYUFBQUQsS0FBQSIsIm5hbWVzIjpbInVzZU1lbW8iLCJ1c2VTdGF0ZSIsIkFycm93UmlnaHQiLCJDaGVjayIsIk1lbnUiLCJNaW51cyIsIlBsdXMiLCJTaG9wcGluZ0JhZyIsIlNwYXJrbGVzIiwiVHJ1Y2siLCJYIiwidG9hc3QiLCJXSEFUU0FQUF9OVU1CRVIiLCJwcm9kdWN0cyIsImlkIiwiY2F0ZWdvcnkiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJwcmljZSIsImltYWdlIiwiYWx0Iiwib3B0aW9ucyIsImFnZVJlc3RyaWN0ZWQiLCJmZWF0dXJlZElkcyIsImNhdGVnb3JpZXMiLCJtb25leSIsInZhbHVlIiwidG9Mb2NhbGVTdHJpbmciLCJzdHlsZSIsImN1cnJlbmN5IiwiSG9tZSIsIl9zIiwic2V0Q2F0ZWdvcnkiLCJjYXJ0Iiwic2V0Q2FydCIsIm1vYmlsZU1lbnUiLCJzZXRNb2JpbGVNZW51IiwiY2FydE9wZW4iLCJzZXRDYXJ0T3BlbiIsInZpc2libGVQcm9kdWN0cyIsImZpbHRlciIsInByb2R1Y3QiLCJjYXJ0RGV0YWlscyIsIm1hcCIsImxpbmUiLCJmaW5kIiwiY2FydENvdW50IiwicmVkdWNlIiwidG90YWwiLCJxdWFudGl0eSIsImNhcnRUb3RhbCIsImFkZFRvQ2FydCIsInByb2R1Y3RJZCIsIm9wdGlvbiIsImN1cnJlbnQiLCJleGlzdGluZyIsInN1Y2Nlc3MiLCJjaGFuZ2VRdWFudGl0eSIsInRhcmdldCIsImRlbHRhIiwic2VuZFdoYXRzQXBwIiwibWVzc2FnZSIsImxlbmd0aCIsImpvaW4iLCJ3aW5kb3ciLCJvcGVuIiwic2Nyb2xsVG9NZW51IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJpdGVtIiwiaW5kZXgiLCJudW1iZXIiLCJ0aXRsZSIsImNvcHkiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIl9jIiwiRmVhdHVyZWRDYXJkIiwib25BZGQiLCJfYzIiLCJQcm9kdWN0Q2FyZCIsIl9zMiIsInNlbGVjdGVkIiwic2V0U2VsZWN0ZWQiLCJhbmltYXRpb25EZWxheSIsIl9jMyIsIiRSZWZyZXNoUmVnJCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJIb21lLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBEZXNpZ246IENvbmZlaXRhcmlhIEVkaXRvcmlhbCDigJQgaW50ZXJmYWNlIGNsYXJhLCBhcGV0aXRpdmEgZSBtb2JpbGUtZmlyc3QgcGFyYSBwZWRpZG9zIHNlbSBhdHJpdG8uICovXG5pbXBvcnQgeyB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgQXJyb3dSaWdodCxcbiAgQ2hlY2ssXG4gIENoZXZyb25Eb3duLFxuICBNZW51LFxuICBNaW51cyxcbiAgUGx1cyxcbiAgU2hvcHBpbmdCYWcsXG4gIFNwYXJrbGVzLFxuICBUcnVjayxcbiAgWCxcbn0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tIFwic29ubmVyXCI7XG5cbmNvbnN0IFdIQVRTQVBQX05VTUJFUiA9IFwiNTUyMTk3Njg0NjY4MlwiO1xuXG5jb25zdCBwcm9kdWN0cyA9IFtcbiAge1xuICAgIGlkOiBcInBhc3RlbC1uaW5ob1wiLFxuICAgIGNhdGVnb3J5OiBcIlBhc3TDqWlzXCIsXG4gICAgbmFtZTogXCJQYXN0ZWwgZGUgTGVpdGUgTmluaG8gY29tIE51dGVsbGFcIixcbiAgICBkZXNjcmlwdGlvbjogXCJNYXNzYSBhcnRlc2FuYWwgZGUgTGVpdGUgTmluaG8gcmVjaGVhZGEgY29tIE51dGVsbGEgY3JlbW9zYS5cIixcbiAgICBwcmljZTogMTcuOTksXG4gICAgaW1hZ2U6IFwiL21hbnVzLXN0b3JhZ2UvbmF1ai1oZXJvLXBhc3RlbF8zMmQxODk5Mi5qcGdcIixcbiAgICBhbHQ6IFwiUGFzdGVsIGFiZXJ0byBjb20gcmVjaGVpbyBjcmVtb3NvIGRlIGxlaXRlIE5pbmhvIGUgTnV0ZWxsYVwiLFxuICAgIG9wdGlvbnM6IFtcIlNlbSBtb3JhbmdvXCIsIFwiQ29tIG1vcmFuZ28gKCtSJCAyLDAwKVwiXSxcbiAgfSxcbiAge1xuICAgIGlkOiBcImFjYWktMzAwXCIsXG4gICAgY2F0ZWdvcnk6IFwiQcOnYcOtXCIsXG4gICAgbmFtZTogXCJBw6dhw60gZGUgR2FycmFmYSAzMDAgbWxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBw6dhw60gY3JlbW9zbywgZ2VsYWRpbmhvIGUgY2hlaW8gZGUgc2Fib3IuXCIsXG4gICAgcHJpY2U6IDIxLjk5LFxuICAgIGltYWdlOiBcIi9tYW51cy1zdG9yYWdlL25hdWotcHJvZHVjdC1hY2FpXzU0NDA1N2I1LmpwZ1wiLFxuICAgIGFsdDogXCJDb3BvIGRlIGHDp2HDrSBjb20gZnJ1dGFzIGZyZXNjYXNcIixcbiAgfSxcbiAge1xuICAgIGlkOiBcImFjYWktNTAwXCIsXG4gICAgY2F0ZWdvcnk6IFwiQcOnYcOtXCIsXG4gICAgbmFtZTogXCJBw6dhw60gZGUgR2FycmFmYSA1MDAgbWxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJDcmVtb3NvLCByZWZyZXNjYW50ZSBlIG5hIG1lZGlkYSBjZXJ0YS5cIixcbiAgICBwcmljZTogMjYuOTksXG4gICAgaW1hZ2U6IFwiL21hbnVzLXN0b3JhZ2UvbmF1ai1wcm9kdWN0LWFjYWlfNTQ0MDU3YjUuanBnXCIsXG4gICAgYWx0OiBcIkNvcG8gZ3JhbmRlIGRlIGHDp2HDrSBjb20gYmFuYW5hIGUgbW9yYW5nb1wiLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiYmF0aWRhLTMwMFwiLFxuICAgIGNhdGVnb3J5OiBcIkJhdGlkYXNcIixcbiAgICBuYW1lOiBcIkJhdGlkYSBBbGNvw7NsaWNhIDMwMCBtbFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkJhdGlkYSBjcmVtb3NhIGUgcmVmcmVzY2FudGUgY29tIGZydXRhIHNlbGVjaW9uYWRhLlwiLFxuICAgIHByaWNlOiAyMS45OSxcbiAgICBpbWFnZTogXCIvbWFudXMtc3RvcmFnZS9uYXVqLXByb2R1Y3QtYWNhaV81NDQwNTdiNS5qcGdcIixcbiAgICBhbHQ6IFwiQmViaWRhIGNyZW1vc2EgZGUgZnJ1dGFzIGVtIGNvcG8gdHJhbnNwYXJlbnRlXCIsXG4gICAgb3B0aW9uczogW1wiTW9yYW5nb1wiLCBcIk1hcmFjdWrDoVwiXSxcbiAgICBhZ2VSZXN0cmljdGVkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiYmF0aWRhLTUwMFwiLFxuICAgIGNhdGVnb3J5OiBcIkJhdGlkYXNcIixcbiAgICBuYW1lOiBcIkJhdGlkYSBBbGNvw7NsaWNhIDUwMCBtbFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkEgbWVzbWEgY3JlbW9zaWRhZGUgZW0gdW1hIHZlcnPDo28gbWFpb3IuXCIsXG4gICAgcHJpY2U6IDI2Ljk5LFxuICAgIGltYWdlOiBcIi9tYW51cy1zdG9yYWdlL25hdWotcHJvZHVjdC1hY2FpXzU0NDA1N2I1LmpwZ1wiLFxuICAgIGFsdDogXCJCZWJpZGEgY3JlbW9zYSBkZSBmcnV0YXMgZW0gdGFtYW5obyBncmFuZGVcIixcbiAgICBvcHRpb25zOiBbXCJNb3JhbmdvXCIsIFwiTWFyYWN1asOhXCJdLFxuICAgIGFnZVJlc3RyaWN0ZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpZDogXCJjb3hpbmhhLWNhbWFyYW9cIixcbiAgICBjYXRlZ29yeTogXCJTYWxnYWRvc1wiLFxuICAgIG5hbWU6IFwiQ294aW5oYSBkZSBDYW1hcsOjbyBjb20gQ2F0dXBpcnnCrlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIk1hc3NhIGxldmUgZSBjcm9jYW50ZSwgcmVjaGVhZGEgY29tIGNhbWFyw6NvIGUgQ2F0dXBpcnnCri5cIixcbiAgICBwcmljZTogMTcuOTksXG4gICAgaW1hZ2U6IFwiL21hbnVzLXN0b3JhZ2UvbmF1ai1wcm9kdWN0LWNveGluaGFfNGQzNzMyOGUuanBnXCIsXG4gICAgYWx0OiBcIkNveGluaGEgZG91cmFkYSBhYmVydGEgY29tIHJlY2hlaW8gY3JlbW9zbyBkZSBjYW1hcsOjb1wiLFxuICAgIG9wdGlvbnM6IFtcIkNhbWFyw6NvXCIsIFwiQ29zdGVsYVwiLCBcIlNhbG3Do29cIl0sXG4gIH0sXG5dO1xuXG5jb25zdCBmZWF0dXJlZElkcyA9IFtcInBhc3RlbC1uaW5ob1wiLCBcImFjYWktNTAwXCIsIFwiY294aW5oYS1jYW1hcmFvXCJdO1xuY29uc3QgY2F0ZWdvcmllcyA9IFtcIlRvZG9zXCIsIFwiUGFzdMOpaXNcIiwgXCJBw6dhw61cIiwgXCJCYXRpZGFzXCIsIFwiU2FsZ2Fkb3NcIl07XG5cbnR5cGUgQ2FydExpbmUgPSB7IGlkOiBzdHJpbmc7IHF1YW50aXR5OiBudW1iZXI7IG9wdGlvbj86IHN0cmluZyB9O1xuXG5mdW5jdGlvbiBtb25leSh2YWx1ZTogbnVtYmVyKSB7XG4gIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZyhcInB0LUJSXCIsIHsgc3R5bGU6IFwiY3VycmVuY3lcIiwgY3VycmVuY3k6IFwiQlJMXCIgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtjYXRlZ29yeSwgc2V0Q2F0ZWdvcnldID0gdXNlU3RhdGUoXCJUb2Rvc1wiKTtcbiAgY29uc3QgW2NhcnQsIHNldENhcnRdID0gdXNlU3RhdGU8Q2FydExpbmVbXT4oW10pO1xuICBjb25zdCBbbW9iaWxlTWVudSwgc2V0TW9iaWxlTWVudV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjYXJ0T3Blbiwgc2V0Q2FydE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHZpc2libGVQcm9kdWN0cyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKGNhdGVnb3J5ID09PSBcIlRvZG9zXCIgPyBwcm9kdWN0cyA6IHByb2R1Y3RzLmZpbHRlcigocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpKSxcbiAgICBbY2F0ZWdvcnldLFxuICApO1xuXG4gIGNvbnN0IGNhcnREZXRhaWxzID0gY2FydC5tYXAoKGxpbmUpID0+ICh7XG4gICAgbGluZSxcbiAgICBwcm9kdWN0OiBwcm9kdWN0cy5maW5kKChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkID09PSBsaW5lLmlkKSEsXG4gIH0pKTtcbiAgY29uc3QgY2FydENvdW50ID0gY2FydC5yZWR1Y2UoKHRvdGFsLCBsaW5lKSA9PiB0b3RhbCArIGxpbmUucXVhbnRpdHksIDApO1xuICBjb25zdCBjYXJ0VG90YWwgPSBjYXJ0RGV0YWlscy5yZWR1Y2UoKHRvdGFsLCB7IGxpbmUsIHByb2R1Y3QgfSkgPT4gdG90YWwgKyBwcm9kdWN0LnByaWNlICogbGluZS5xdWFudGl0eSwgMCk7XG5cbiAgZnVuY3Rpb24gYWRkVG9DYXJ0KHByb2R1Y3RJZDogc3RyaW5nLCBvcHRpb24/OiBzdHJpbmcpIHtcbiAgICBzZXRDYXJ0KChjdXJyZW50KSA9PiB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IGN1cnJlbnQuZmluZCgobGluZSkgPT4gbGluZS5pZCA9PT0gcHJvZHVjdElkICYmIGxpbmUub3B0aW9uID09PSBvcHRpb24pO1xuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50Lm1hcCgobGluZSkgPT5cbiAgICAgICAgICBsaW5lID09PSBleGlzdGluZyA/IHsgLi4ubGluZSwgcXVhbnRpdHk6IGxpbmUucXVhbnRpdHkgKyAxIH0gOiBsaW5lLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFsuLi5jdXJyZW50LCB7IGlkOiBwcm9kdWN0SWQsIHF1YW50aXR5OiAxLCBvcHRpb24gfV07XG4gICAgfSk7XG4gICAgdG9hc3Quc3VjY2VzcyhcIkFkaWNpb25hZG8gYW8gc2V1IHBlZGlkb1wiLCB7IGRlc2NyaXB0aW9uOiBcIlZvY8OqIHBvZGUgcmV2aXNhciB0dWRvIG5hIHNhY29sYS5cIiB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZVF1YW50aXR5KHRhcmdldDogQ2FydExpbmUsIGRlbHRhOiBudW1iZXIpIHtcbiAgICBzZXRDYXJ0KChjdXJyZW50KSA9PlxuICAgICAgY3VycmVudFxuICAgICAgICAubWFwKChsaW5lKSA9PlxuICAgICAgICAgIGxpbmUgPT09IHRhcmdldCA/IHsgLi4ubGluZSwgcXVhbnRpdHk6IGxpbmUucXVhbnRpdHkgKyBkZWx0YSB9IDogbGluZSxcbiAgICAgICAgKVxuICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiBsaW5lLnF1YW50aXR5ID4gMCksXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbmRXaGF0c0FwcCgpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gY2FydERldGFpbHMubGVuZ3RoXG4gICAgICA/IGBPbMOhISBHb3N0YXJpYSBkZSBmYXplciBlc3RlIHBlZGlkbyBuYSBOYXVqIERvY2VyaWE6JTBBJTBBJHtjYXJ0RGV0YWlsc1xuICAgICAgICAgIC5tYXAoKHsgbGluZSwgcHJvZHVjdCB9KSA9PiBgJHtsaW5lLnF1YW50aXR5fXggJHtwcm9kdWN0Lm5hbWV9JHtsaW5lLm9wdGlvbiA/IGAg4oCUICR7bGluZS5vcHRpb259YCA6IFwiXCJ9YClcbiAgICAgICAgICAuam9pbihcIiUwQVwiKX0gJTBBJTBBVG90YWwgZXN0aW1hZG86ICR7bW9uZXkoY2FydFRvdGFsKX0lMEElMEFQb2RlIG1lIGluZm9ybWFyIGFzIG9ww6fDtWVzIGRlIGVudHJlZ2EgZSBwYWdhbWVudG8/YFxuICAgICAgOiBcIk9sw6EhIFZpbSBwZWxvIGNhcmTDoXBpbyBkYSBOYXVqIERvY2VyaWEgZSBnb3N0YXJpYSBkZSBmYXplciB1bSBwZWRpZG8uXCI7XG4gICAgd2luZG93Lm9wZW4oYGh0dHBzOi8vd2EubWUvJHtXSEFUU0FQUF9OVU1CRVJ9P3RleHQ9JHttZXNzYWdlfWAsIFwiX2JsYW5rXCIsIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvTWVudSgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcmRhcGlvXCIpPy5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBvdmVyZmxvdy14LWhpZGRlbiBiZy1bI2ZmZjhmMV0gdGV4dC1bIzNjMjExY11cIj5cbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwic3RpY2t5IHRvcC0wIHotNDAgYm9yZGVyLWIgYm9yZGVyLVsjM2MyMTFjXS8xMCBiZy1bI2ZmZjhmMV0vOTUgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LWF1dG8gZmxleCBoLVs3NnB4XSBtYXgtdy03eGwgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC01IHNtOnB4LThcIj5cbiAgICAgICAgICA8YSBocmVmPVwiI2luaWNpb1wiIGNsYXNzTmFtZT1cImdyb3VwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCIgYXJpYS1sYWJlbD1cIk5hdWogRG9jZXJpYSwgaW7DrWNpb1wiPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIvbWFudXMtc3RvcmFnZS9uYXVqLWJyYW5kLW1hcmtfY2E3Yzg4MzkucG5nXCIgYWx0PVwiXCIgY2xhc3NOYW1lPVwiaC0xMSB3LTExIG9iamVjdC1jb250YWluXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxlYWRpbmctbm9uZVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayBmb250LWRpc3BsYXkgdGV4dC1bMjdweF0gdHJhY2tpbmctWy0wLjA2ZW1dXCI+bmF1ajwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgcGwtMSB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yOGVtXSB0ZXh0LVsjOGI1YTRmXVwiPmRvY2VyaWE8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gaXRlbXMtY2VudGVyIGdhcC04IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1bIzY4NDUzZF0gbWQ6ZmxleFwiIGFyaWEtbGFiZWw9XCJOYXZlZ2HDp8OjbyBwcmluY2lwYWxcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rIGFjdGl2ZVwiIGhyZWY9XCIjaW5pY2lvXCI+SW7DrWNpbzwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNjYXJkYXBpb1wiPkNhcmTDoXBpbzwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNjb21vLXBlZGlyXCI+Q29tbyBwZWRpcjwvYT5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaHJlZj1cIiNjb250YXRvXCI+Q29udGF0bzwvYT5cbiAgICAgICAgICA8L25hdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiaGlkZGVuIGJ1dHRvbi1wcmltYXJ5IHNtOmZsZXhcIiBvbkNsaWNrPXtzZW5kV2hhdHNBcHB9PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWxnXCI+4peUPC9zcGFuPiBQZWRpciBwZWxvIFdoYXRzQXBwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC1mdWxsIHAtMiB0ZXh0LVsjM2MyMTFjXSB0cmFuc2l0aW9uIGhvdmVyOmJnLVsjZjJiNWFhXS8yNSBtZDpoaWRkZW5cIiBvbkNsaWNrPXsoKSA9PiBzZXRNb2JpbGVNZW51KCFtb2JpbGVNZW51KX0gYXJpYS1sYWJlbD1cIkFicmlyIG1lbnVcIj5cbiAgICAgICAgICAgICAge21vYmlsZU1lbnUgPyA8WCBzaXplPXsyNH0gLz4gOiA8TWVudSBzaXplPXsyNH0gLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHttb2JpbGVNZW51ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1bIzNjMjExY10vMTAgYmctWyNmZmY4ZjFdIHB4LTUgcHktNCBtZDpoaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNCB0ZXh0LXNtIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNpbmljaW9cIiBvbkNsaWNrPXsoKSA9PiBzZXRNb2JpbGVNZW51KGZhbHNlKX0+SW7DrWNpbzwvYT5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNjYXJkYXBpb1wiIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnUoZmFsc2UpfT5DYXJkw6FwaW88L2E+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIjY29tby1wZWRpclwiIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZU1lbnUoZmFsc2UpfT5Db21vIHBlZGlyPC9hPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiI2NvbnRhdG9cIiBvbkNsaWNrPXsoKSA9PiBzZXRNb2JpbGVNZW51KGZhbHNlKX0+Q29udGF0bzwvYT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24tcHJpbWFyeSB3LWZ1bGxcIiBvbkNsaWNrPXtzZW5kV2hhdHNBcHB9PlBlZGlyIHBlbG8gV2hhdHNBcHA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIDxtYWluPlxuICAgICAgICA8c2VjdGlvbiBpZD1cImluaWNpb1wiIGNsYXNzTmFtZT1cInJlbGF0aXZlIG14LWF1dG8gbWF4LXctN3hsIHB4LTUgcGItMTQgcHQtOCBzbTpweC04IHNtOnB0LTEyIGxnOnBiLTIwIGxnOnB0LTE2XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZXJvLWdyaWQgaGVyby1ncmlkLS10ZXh0LW9ubHkgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtWzJyZW1dIGJnLVsjZmFlZWU0XSBzaGFkb3ctWzBfMjRweF82MHB4X3JnYmEoOTEsNDUsMzIsMC4xMCldXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTcgcHktMTYgdGV4dC1jZW50ZXIgc206cHgtMTIgc206cHktMjAgbGc6cHgtMTYgbGc6cHktMjRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi03IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yMmVtXSB0ZXh0LVsjZDk2ZjU1XVwiPjxTcGFya2xlcyBzaXplPXsxNX0gLz4gRmVpdG8gcGFyYSBhZG/Dp2FyIHNldSBkaWE8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm1heC13LTN4bCBmb250LWRpc3BsYXkgdGV4dC1bY2xhbXAoM3JlbSw3dncsNi40cmVtKV0gbGVhZGluZy1bMC45OF0gdHJhY2tpbmctWy0wLjA2NWVtXSB0ZXh0LVsjM2MyMTFjXVwiPlNldSBtb21lbnRvIDxlbSBjbGFzc05hbWU9XCJub3QtaXRhbGljIHRleHQtWyNkOTZmNTVdXCI+bWFpcyBnb3N0b3NvPC9lbT4gY29tZcOnYSBhcXVpLjwvaDE+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTYgbWF4LXcteGwgdGV4dC1iYXNlIGxlYWRpbmctNyB0ZXh0LVsjNzY1ODRmXSBzbTp0ZXh0LWxnXCI+RG9jZXMsIGHDp2HDrSBlIHNhbGdhZG9zIHByZXBhcmFkb3MgY29tIGNhcmluaG8gcGFyYSB0cmFuc2Zvcm1hciB1bWEgcGF1c2EgcXVhbHF1ZXIgZW0gdW0gbW9tZW50byBlc3BlY2lhbC48L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbi1wcmltYXJ5XCIgb25DbGljaz17c2Nyb2xsVG9NZW51fT5WZXIgY2FyZMOhcGlvIDxBcnJvd1JpZ2h0IHNpemU9ezE3fSAvPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LVsjNzY1ODRmXVwiPjxUcnVjayBzaXplPXsxOH0gY2xhc3NOYW1lPVwidGV4dC1bI2Q5NmY1NV1cIiAvPiBFbnRyZWdhIGUgcmV0aXJhZGE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTkgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC14cyB0ZXh0LVsjOTg3YjcwXVwiPjxzcGFuIGNsYXNzTmFtZT1cImgtcHggdy04IGJnLVsjZDk2ZjU1XVwiIC8+IEluZ3JlZGllbnRlcyBzZWxlY2lvbmFkb3MgwrcgY2FyaW5obyBlbSBjYWRhIGRldGFsaGUgPHNwYW4gY2xhc3NOYW1lPVwiaC1weCB3LTggYmctWyNkOTZmNTVdXCIgLz48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwibXgtYXV0byBtYXgtdy03eGwgcHgtNSBwYi0xNiBzbTpweC04IGxnOnBiLTI0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi03IGZsZXggaXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtNVwiPlxuICAgICAgICAgICAgPGRpdj48cCBjbGFzc05hbWU9XCJleWVicm93XCI+UGFyYSBjb21lw6dhciBiZW08L3A+PGgyIGNsYXNzTmFtZT1cInNlY3Rpb24tdGl0bGVcIj5NYWlzIHBlZGlkb3MgPHNwYW4gY2xhc3NOYW1lPVwibGVhZi1tYXJrXCI+4py/PC9zcGFuPjwvaDI+PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtWyNkOTZmNTVdIHRyYW5zaXRpb24gaG92ZXI6dHJhbnNsYXRlLXgtMVwiIG9uQ2xpY2s9e3Njcm9sbFRvTWVudX0+VmVyIHRvZG9zIDxBcnJvd1JpZ2h0IHNpemU9ezE2fSBjbGFzc05hbWU9XCJtbC0xIGlubGluZVwiIC8+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdhcC00IG1kOmdyaWQtY29scy0zXCI+XG4gICAgICAgICAgICB7ZmVhdHVyZWRJZHMubWFwKChpZCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gcHJvZHVjdHMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpITtcbiAgICAgICAgICAgICAgcmV0dXJuIDxGZWF0dXJlZENhcmQga2V5PXtwcm9kdWN0LmlkfSBwcm9kdWN0PXtwcm9kdWN0fSBvbkFkZD17YWRkVG9DYXJ0fSAvPjtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJjYXJkYXBpb1wiIGNsYXNzTmFtZT1cImJvcmRlci15IGJvcmRlci1bIzNjMjExY10vOCBiZy1bI2ZmZmRmOV0gcHgtNSBweS0xNiBzbTpweC04IGxnOnB5LTI0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteC1hdXRvIG1heC13LTd4bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0xMCBtYXgtdy14bFwiPjxwIGNsYXNzTmFtZT1cImV5ZWJyb3dcIj5Fc2NvbGhhIHNldSBmYXZvcml0bzwvcD48aDIgY2xhc3NOYW1lPVwic2VjdGlvbi10aXRsZVwiPk5vc3NvIGNhcmTDoXBpbzwvaDI+PHAgY2xhc3NOYW1lPVwibXQtNCBsZWFkaW5nLTcgdGV4dC1bIzgwNjQ1YV1cIj5VbWEgc2VsZcOnw6NvIGZlaXRhIHBhcmEgY29tcGFydGlsaGFyIOKAlCBvdSBndWFyZGFyIHPDsyBwYXJhIHZvY8OqLjwvcD48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2F0ZWdvcnktc2Nyb2xsZXIgbWItMTAgZmxleCBnYXAtMiBvdmVyZmxvdy14LWF1dG8gcGItMlwiIHJvbGU9XCJ0YWJsaXN0XCIgYXJpYS1sYWJlbD1cIkNhdGVnb3JpYXMgZG8gY2FyZMOhcGlvXCI+XG4gICAgICAgICAgICAgIHtjYXRlZ29yaWVzLm1hcCgoaXRlbSkgPT4gPGJ1dHRvbiBrZXk9e2l0ZW19IHJvbGU9XCJ0YWJcIiBhcmlhLXNlbGVjdGVkPXtjYXRlZ29yeSA9PT0gaXRlbX0gY2xhc3NOYW1lPXtgY2F0ZWdvcnktY2hpcCAke2NhdGVnb3J5ID09PSBpdGVtID8gXCJzZWxlY3RlZFwiIDogXCJcIn1gfSBvbkNsaWNrPXsoKSA9PiBzZXRDYXRlZ29yeShpdGVtKX0+e2l0ZW19PC9idXR0b24+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdhcC00IGxnOmdyaWQtY29scy0yXCI+XG4gICAgICAgICAgICAgIHt2aXNpYmxlUHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4gPFByb2R1Y3RDYXJkIGtleT17cHJvZHVjdC5pZH0gcHJvZHVjdD17cHJvZHVjdH0gaW5kZXg9e2luZGV4fSBvbkFkZD17YWRkVG9DYXJ0fSAvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiY29tby1wZWRpclwiIGNsYXNzTmFtZT1cIm14LWF1dG8gbWF4LXctN3hsIHB4LTUgcHktMTYgc206cHgtOCBsZzpweS0yNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG93LWdyaWQgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtWzJyZW1dIGJnLVsjZWFkN2M4XVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtaW4taC1bMjkwcHhdIG92ZXJmbG93LWhpZGRlbiBzbTptaW4taC1bMzgwcHhdXCI+PGltZyBzcmM9XCIvbWFudXMtc3RvcmFnZS9uYXVqLXByb2R1Y3QtY294aW5oYV80ZDM3MzI4ZS5qcGdcIiBhbHQ9XCJDb3hpbmhhIGRlIGNhbWFyw6NvIGRvdXJhZGFcIiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGgtZnVsbCB3LWZ1bGwgb2JqZWN0LWNvdmVyXCIgLz48ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdCBmcm9tLVsjM2MyMTFjXS80MCB0by10cmFuc3BhcmVudFwiIC8+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1jZW50ZXIgcHgtNyBweS0xMiBzbTpweC0xMiBsZzpweC0xNlwiPjxwIGNsYXNzTmFtZT1cImV5ZWJyb3cgdGV4dC1bI2I3NWI0N11cIj5EbyBzZXUgamVpdG88L3A+PGgyIGNsYXNzTmFtZT1cInNlY3Rpb24tdGl0bGUgbWF4LXctbWRcIj5QZWRpciDDqSBzaW1wbGVzLCBnb3N0b3NvIGUgc2VtIGNvbXBsaWNhw6fDo28uPC9oMj48ZGl2IGNsYXNzTmFtZT1cIm10LTggZ3JpZCBnYXAtNSBzbTpncmlkLWNvbHMtMyBsZzpncmlkLWNvbHMtMVwiPntbW1wiMDFcIiwgXCJFc2NvbGhhXCIsIFwiRW5jb250cmUgc2V1cyBmYXZvcml0b3Mgbm8gY2FyZMOhcGlvLlwiXSwgW1wiMDJcIiwgXCJNb250ZVwiLCBcIkFkaWNpb25lIG9zIGl0ZW5zIGUgcHJlZmVyw6puY2lhcy5cIl0sIFtcIjAzXCIsIFwiUmVjZWJhXCIsIFwiRmluYWxpemUgcGVsbyBXaGF0c0FwcCBlIGNvbWJpbmUgdHVkby5cIl1dLm1hcCgoW251bWJlciwgdGl0bGUsIGNvcHldKSA9PiA8ZGl2IGtleT17bnVtYmVyfSBjbGFzc05hbWU9XCJmbGV4IGdhcC00XCI+PHNwYW4gY2xhc3NOYW1lPVwiZm9udC1kaXNwbGF5IHRleHQtMnhsIHRleHQtWyNkOTZmNTVdXCI+e251bWJlcn08L3NwYW4+PGRpdj48aDMgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+e3RpdGxlfTwvaDM+PHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIGxlYWRpbmctNiB0ZXh0LVsjNzY1ODRmXVwiPntjb3B5fTwvcD48L2Rpdj48L2Rpdj4pfTwvZGl2PjxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLXByaW1hcnkgbXQtOSB3LWZpdFwiIG9uQ2xpY2s9e3NlbmRXaGF0c0FwcH0+Q29tZcOnYXIgbWV1IHBlZGlkbyA8QXJyb3dSaWdodCBzaXplPXsxN30gLz48L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiY29udGF0b1wiIGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1bIzNjMjExY10vOCBiZy1bI2Y4ZWRlM10gcHgtNSBweS0xNCBzbTpweC04XCI+PGRpdiBjbGFzc05hbWU9XCJteC1hdXRvIGZsZXggbWF4LXctN3hsIGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBnYXAtOCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXJcIj48ZGl2PjxwIGNsYXNzTmFtZT1cImV5ZWJyb3dcIj5Fc3RhbW9zIHBvciBhcXVpPC9wPjxoMiBjbGFzc05hbWU9XCJmb250LWRpc3BsYXkgdGV4dC0zeGwgdHJhY2tpbmctWy0wLjA0ZW1dXCI+U2V1IHByw7N4aW1vIGRlc2VqbyBlc3TDoSBhIHVtIGNsaXF1ZS48L2gyPjwvZGl2PjxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTYgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtWyM2ODQ1M2RdXCI+PGEgaHJlZj1cInRlbDorNTUyMTk3Njg0NjY4MlwiIGNsYXNzTmFtZT1cImNvbnRhY3QtbGlua1wiPis1NSAyMSA5NzY4NC02NjgyPC9hPjxhIGhyZWY9XCJodHRwczovL2luc3RhZ3JhbS5jb20vbmF1ai5kb2NlcmlhX1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBjbGFzc05hbWU9XCJjb250YWN0LWxpbmtcIj5AbmF1ai5kb2NlcmlhXzwvYT48L2Rpdj48L2Rpdj48L3NlY3Rpb24+XG4gICAgICA8L21haW4+XG5cbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiYmctWyMzYzIxMWNdIHB4LTUgcHktMTAgdGV4dC1bI2ZmZjhmMV0gc206cHgtOFwiPjxkaXYgY2xhc3NOYW1lPVwibXgtYXV0byBmbGV4IG1heC13LTd4bCBmbGV4LWNvbCBnYXAtNyBzbTpmbGV4LXJvdyBzbTppdGVtcy1lbmQgc206anVzdGlmeS1iZXR3ZWVuXCI+PGRpdj48ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+PGltZyBzcmM9XCIvbWFudXMtc3RvcmFnZS9uYXVqLWJyYW5kLW1hcmtfY2E3Yzg4MzkucG5nXCIgYWx0PVwiXCIgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIGJyaWdodG5lc3MtMCBpbnZlcnRcIiAvPjxzcGFuPjxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIGZvbnQtZGlzcGxheSB0ZXh0LTN4bCB0cmFja2luZy1bLTAuMDZlbV1cIj5uYXVqPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHBsLTEgdGV4dC1bOXB4XSB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMjhlbV0gdGV4dC1bI2YyYjVhYV1cIj5kb2NlcmlhPC9zcGFuPjwvc3Bhbj48L2Rpdj48cCBjbGFzc05hbWU9XCJtdC00IG1heC13LXhzIHRleHQtc20gbGVhZGluZy02IHRleHQtWyNlNGNmYzNdXCI+RG9jZXMsIGHDp2HDrSBlIHNhbGdhZG9zIHByZXBhcmFkb3MgY29tIGNhcmluaG8uPC9wPjwvZGl2PjxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LVsjZTRjZmMzXSBzbTp0ZXh0LXJpZ2h0XCI+PHA+QXRlbmRpbWVudG8gZGFzIDExaCDDoHMgMDBoPC9wPjxwIGNsYXNzTmFtZT1cIm10LTJcIj7CqSAyMDI2IE5hdWogRG9jZXJpYTwvcD48L2Rpdj48L2Rpdj48L2Zvb3Rlcj5cblxuICAgICAge2NhcnRDb3VudCA+IDAgJiYgPGJ1dHRvbiBjbGFzc05hbWU9XCJjYXJ0LWJhclwiIG9uQ2xpY2s9eygpID0+IHNldENhcnRPcGVuKHRydWUpfSBhcmlhLWxhYmVsPVwiQWJyaXIgc2V1IHBlZGlkb1wiPjxzcGFuIGNsYXNzTmFtZT1cImNhcnQtaWNvblwiPjxTaG9wcGluZ0JhZyBzaXplPXsyMX0gLz48Yj57Y2FydENvdW50fTwvYj48L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwiZmxleC0xIHRleHQtbGVmdFwiPjxzdHJvbmc+U2V1IHBlZGlkbzwvc3Ryb25nPjxzbWFsbD57bW9uZXkoY2FydFRvdGFsKX08L3NtYWxsPjwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gZm9udC1ib2xkIHNtOmlubGluZVwiPlJldmlzYXIgcGVkaWRvPC9zcGFuPjxBcnJvd1JpZ2h0IHNpemU9ezE5fSAvPjwvYnV0dG9uPn1cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgd2hhdHNhcHAtZmFiICR7Y2FydENvdW50ID4gMCA/IFwiYWJvdmUtY2FydFwiIDogXCJcIn1gfSBvbkNsaWNrPXtzZW5kV2hhdHNBcHB9IGFyaWEtbGFiZWw9XCJQZWRpciBwZWxvIFdoYXRzQXBwXCI+4peUPHNwYW4gY2xhc3NOYW1lPVwic3Itb25seVwiPlBlZGlyIHBlbG8gV2hhdHNBcHA8L3NwYW4+PC9idXR0b24+XG5cbiAgICAgIHtjYXJ0T3BlbiAmJiA8ZGl2IGNsYXNzTmFtZT1cImRyYXdlci1iYWNrZHJvcFwiIG9uQ2xpY2s9eygpID0+IHNldENhcnRPcGVuKGZhbHNlKX0+PGFzaWRlIGNsYXNzTmFtZT1cImNhcnQtZHJhd2VyXCIgb25DbGljaz17KGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX0+PGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLVsjM2MyMTFjXS8xMCBweC02IHB5LTVcIj48ZGl2PjxwIGNsYXNzTmFtZT1cImV5ZWJyb3dcIj5RdWFzZSBsw6E8L3A+PGgyIGNsYXNzTmFtZT1cImZvbnQtZGlzcGxheSB0ZXh0LTN4bFwiPlNldSBwZWRpZG88L2gyPjwvZGl2PjxidXR0b24gY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHAtMiBob3ZlcjpiZy1bI2YyYjVhYV0vMjVcIiBvbkNsaWNrPXsoKSA9PiBzZXRDYXJ0T3BlbihmYWxzZSl9IGFyaWEtbGFiZWw9XCJGZWNoYXIgcGVkaWRvXCI+PFggc2l6ZT17MjF9IC8+PC9idXR0b24+PC9kaXY+PGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHB4LTYgcHktNVwiPntjYXJ0RGV0YWlscy5tYXAoKHsgbGluZSwgcHJvZHVjdCB9KSA9PiA8ZGl2IGtleT17YCR7bGluZS5pZH0tJHtsaW5lLm9wdGlvbn1gfSBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItWyMzYzIxMWNdLzEwIHB5LTQgZmlyc3Q6cHQtMFwiPjxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNFwiPjxpbWcgc3JjPXtwcm9kdWN0LmltYWdlfSBhbHQ9XCJcIiBjbGFzc05hbWU9XCJoLTIwIHctMjAgcm91bmRlZC0yeGwgb2JqZWN0LWNvdmVyXCIgLz48ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+PGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCBsZWFkaW5nLTVcIj57cHJvZHVjdC5uYW1lfTwvaDM+e2xpbmUub3B0aW9uICYmIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LVsjOGI2YjYxXVwiPntsaW5lLm9wdGlvbn08L3A+fTxkaXYgY2xhc3NOYW1lPVwibXQtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj48c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtWyNkOTZmNTVdXCI+e21vbmV5KHByb2R1Y3QucHJpY2UgKiBsaW5lLnF1YW50aXR5KX08L3N0cm9uZz48ZGl2IGNsYXNzTmFtZT1cInF1YW50aXR5LWNvbnRyb2xcIj48YnV0dG9uIG9uQ2xpY2s9eygpID0+IGNoYW5nZVF1YW50aXR5KGxpbmUsIC0xKX0gYXJpYS1sYWJlbD1cIkRpbWludWlyIHF1YW50aWRhZGVcIj48TWludXMgc2l6ZT17MTR9IC8+PC9idXR0b24+PHNwYW4+e2xpbmUucXVhbnRpdHl9PC9zcGFuPjxidXR0b24gb25DbGljaz17KCkgPT4gY2hhbmdlUXVhbnRpdHkobGluZSwgMSl9IGFyaWEtbGFiZWw9XCJBdW1lbnRhciBxdWFudGlkYWRlXCI+PFBsdXMgc2l6ZT17MTR9IC8+PC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+KX08L2Rpdj48ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1bIzNjMjExY10vMTAgYmctWyNmZmY4ZjFdIHB4LTYgcHktNVwiPjxkaXYgY2xhc3NOYW1lPVwibWItNCBmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LWxnIGZvbnQtYm9sZFwiPjxzcGFuPlRvdGFsIGVzdGltYWRvPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInRleHQtWyNkOTZmNTVdXCI+e21vbmV5KGNhcnRUb3RhbCl9PC9zcGFuPjwvZGl2PjxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uLXByaW1hcnkgdy1mdWxsIGp1c3RpZnktY2VudGVyXCIgb25DbGljaz17c2VuZFdoYXRzQXBwfT5Db250aW51YXIgbm8gV2hhdHNBcHAgPEFycm93UmlnaHQgc2l6ZT17MTd9IC8+PC9idXR0b24+PHAgY2xhc3NOYW1lPVwibXQtMyB0ZXh0LWNlbnRlciB0ZXh0LXhzIHRleHQtWyM4YjZiNjFdXCI+QSBlbnRyZWdhIGUgbyBwYWdhbWVudG8gc8OjbyBjb21iaW5hZG9zIHBlbG8gV2hhdHNBcHAuPC9wPjwvZGl2PjwvYXNpZGU+PC9kaXY+fVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBGZWF0dXJlZENhcmQoeyBwcm9kdWN0LCBvbkFkZCB9OiB7IHByb2R1Y3Q6IHR5cGVvZiBwcm9kdWN0c1tudW1iZXJdOyBvbkFkZDogKGlkOiBzdHJpbmcsIG9wdGlvbj86IHN0cmluZykgPT4gdm9pZCB9KSB7XG4gIHJldHVybiA8YXJ0aWNsZSBjbGFzc05hbWU9XCJmZWF0dXJlZC1jYXJkIGdyb3VwXCI+PGRpdiBjbGFzc05hbWU9XCJmZWF0dXJlZC1pbWFnZVwiPjxpbWcgc3JjPXtwcm9kdWN0LmltYWdlfSBhbHQ9e3Byb2R1Y3QuYWx0fSAvPjxzcGFuIGNsYXNzTmFtZT1cImZlYXR1cmVkLXRhZ1wiPnF1ZXJpZGluaG88L3NwYW4+PC9kaXY+PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtMSBmbGV4LWNvbCBwLTVcIj48ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+PGgzIGNsYXNzTmFtZT1cImZvbnQtZGlzcGxheSB0ZXh0LVsxLjM4cmVtXSBsZWFkaW5nLXRpZ2h0IHRyYWNraW5nLVstMC4wM2VtXVwiPntwcm9kdWN0Lm5hbWV9PC9oMz48c3Ryb25nIGNsYXNzTmFtZT1cIndoaXRlc3BhY2Utbm93cmFwIHRleHQtbGcgdGV4dC1bI2Q5NmY1NV1cIj57bW9uZXkocHJvZHVjdC5wcmljZSl9PC9zdHJvbmc+PC9kaXY+PHAgY2xhc3NOYW1lPVwibXQtMiBsaW5lLWNsYW1wLTIgdGV4dC1zbSBsZWFkaW5nLTYgdGV4dC1bIzgwNjQ1YV1cIj57cHJvZHVjdC5kZXNjcmlwdGlvbn08L3A+PGJ1dHRvbiBjbGFzc05hbWU9XCJvdXRsaW5lLWJ1dHRvbiBtdC01IHctZnVsbFwiIG9uQ2xpY2s9eygpID0+IG9uQWRkKHByb2R1Y3QuaWQsIHByb2R1Y3Qub3B0aW9ucz8uWzBdKX0+PFNob3BwaW5nQmFnIHNpemU9ezE2fSAvPiBBZGljaW9uYXI8L2J1dHRvbj48L2Rpdj48L2FydGljbGU+O1xufVxuXG5mdW5jdGlvbiBQcm9kdWN0Q2FyZCh7IHByb2R1Y3QsIGluZGV4LCBvbkFkZCB9OiB7IHByb2R1Y3Q6IHR5cGVvZiBwcm9kdWN0c1tudW1iZXJdOyBpbmRleDogbnVtYmVyOyBvbkFkZDogKGlkOiBzdHJpbmcsIG9wdGlvbj86IHN0cmluZykgPT4gdm9pZCB9KSB7XG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUocHJvZHVjdC5vcHRpb25zPy5bMF0pO1xuICByZXR1cm4gPGFydGljbGUgY2xhc3NOYW1lPVwicHJvZHVjdC1yb3cgYW5pbWF0ZS1pblwiIHN0eWxlPXt7IGFuaW1hdGlvbkRlbGF5OiBgJHtpbmRleCAqIDUwfW1zYCB9fT48aW1nIHNyYz17cHJvZHVjdC5pbWFnZX0gYWx0PXtwcm9kdWN0LmFsdH0gY2xhc3NOYW1lPVwicHJvZHVjdC10aHVtYlwiIC8+PGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMSBweS0xXCI+PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj48ZGl2PjxkaXYgY2xhc3NOYW1lPVwibWItMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPntwcm9kdWN0LmFnZVJlc3RyaWN0ZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwiYWdlLWJhZGdlXCI+KzE4PC9zcGFuPn08aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgbGVhZGluZy02XCI+e3Byb2R1Y3QubmFtZX08L2gzPjwvZGl2PjxwIGNsYXNzTmFtZT1cIm1heC13LXhsIHRleHQtc20gbGVhZGluZy02IHRleHQtWyM4MDY0NWFdXCI+e3Byb2R1Y3QuZGVzY3JpcHRpb259PC9wPjwvZGl2PjxzdHJvbmcgY2xhc3NOYW1lPVwid2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1sZyB0ZXh0LVsjZDk2ZjU1XVwiPnttb25leShwcm9kdWN0LnByaWNlKX08L3N0cm9uZz48L2Rpdj57cHJvZHVjdC5vcHRpb25zICYmIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPntwcm9kdWN0Lm9wdGlvbnMubWFwKChvcHRpb24pID0+IDxidXR0b24ga2V5PXtvcHRpb259IGNsYXNzTmFtZT17YG9wdGlvbi1jaGlwICR7c2VsZWN0ZWQgPT09IG9wdGlvbiA/IFwic2VsZWN0ZWRcIiA6IFwiXCJ9YH0gb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWQob3B0aW9uKX0+e3NlbGVjdGVkID09PSBvcHRpb24gJiYgPENoZWNrIHNpemU9ezEzfSAvPn17b3B0aW9ufTwvYnV0dG9uPil9PC9kaXY+fTxidXR0b24gY2xhc3NOYW1lPVwib3V0bGluZS1idXR0b24gbXQtNFwiIG9uQ2xpY2s9eygpID0+IG9uQWRkKHByb2R1Y3QuaWQsIHNlbGVjdGVkKX0+PFBsdXMgc2l6ZT17MTZ9IC8+IEFkaWNpb25hcjwvYnV0dG9uPjwvZGl2PjwvYXJ0aWNsZT47XG59XG4iXSwiZmlsZSI6Ii9ob21lL3VidW50dS9uYXVqLWRvY2VyaWEtcmVkZXNpZ24vY2xpZW50L3NyYy9wYWdlcy9Ib21lLnRzeCJ9