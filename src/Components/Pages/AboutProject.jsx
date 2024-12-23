import ListGenerator from "../Common/ListGenerator";


const content = [
  {
    header: "Ciele projektu",
    text: "Cieľ projektu spočíva vo vytvorení webovej stránky, ktorá poskytuje prehľadný a aktuálny pohľad na vývoj cien pohonných hmôt na Slovensku. Zameriavame sa na zhromažďovanie a vizualizáciu údajov o cenách benzínu, nafty a iných palív v reálnom čase, aby si každý mohol jednoducho sledovať, ako sa ceny menia. Našim cieľom je priniesť  užitočný nástroj pre motoristov, ktorý im pomôže plánovať nákupy a sledovať trendy na trhu s palivami.",
  },
  {
    header: "Ciele projektu",
    text: "Cieľ projektu spočíva vo vytvorení webovej stránky, ktorá poskytuje prehľadný a aktuálny pohľad na vývoj cien pohonných hmôt na Slovensku. Zameriavame sa na zhromažďovanie a vizualizáciu údajov o cenách benzínu, nafty a iných palív v reálnom čase, aby si každý mohol jednoducho sledovať, ako sa ceny menia. Našim cieľom je priniesť  užitočný nástroj pre motoristov, ktorý im pomôže plánovať nákupy a sledovať trendy na trhu s palivami.",
  },
  {
    header: "Ciele projektu",
    text: "Cieľ projektu spočíva vo vytvorení webovej stránky, ktorá poskytuje prehľadný a aktuálny pohľad na vývoj cien pohonných hmôt na Slovensku. Zameriavame sa na zhromažďovanie a vizualizáciu údajov o cenách benzínu, nafty a iných palív v reálnom čase, aby si každý mohol jednoducho sledovať, ako sa ceny menia. Našim cieľom je priniesť  užitočný nástroj pre motoristov, ktorý im pomôže plánovať nákupy a sledovať trendy na trhu s palivami.",
  },
];
export default function AboutProject() {
  return (
    <>
      <div className="border-b-2 w-full text-center py-2 ">
        <h1 className="text-4xl">Viac o projekte Palivoslovensko</h1>
      </div>
      <ListGenerator content={content} />
    </>
  );
}
