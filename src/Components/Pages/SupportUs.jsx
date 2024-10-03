import ListGenerator from "../Common/ListGenerator";

const content = [
  {
    header: "Podpor nás",
    text: "Ak sa ti naša tvorba páči a rád by si nás podporil, môžeš tak urobiť rôznymi spôsobmi. Každá podpora, či už finančná alebo vo forme zdieľania našich príspevkov, nám veľmi pomôže pokračovať v tvorbe obsahu, ktorý má pre teba hodnotu. S tvojou pomocou môžeme rozvíjať naše projekty, zlepšovať kvalitu a prinášať ti ešte viac inšpirácie a zaujímavého obsahu.",
  },
];

export default function SupportUs() {
  return (
    <>
      <div className="border-b-2 w-full text-center py-2">
        <h1 className="text-4xl">Podpor nás</h1>
      </div>
      <ListGenerator content={content} />
    </>
  );
}
