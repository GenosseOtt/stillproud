import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PieChart } from "@mantine/charts";
import daxObj from "@site/static/data/dax.json";

import styles from "./index.module.css";
import { Button, Container, Flex, Stack, Table } from "@mantine/core";
import { useState } from "react";

const companies = daxObj.companies.sort((a, b) => a.name.localeCompare(b.name));
const inFavor = companies.filter(
  (company) =>
    company.rainbowFlagDuringPrideMonth === true ||
    company.rainbowFlagAlways === true
);
const unknown = companies.filter(
  (company) =>
    company.rainbowFlagDuringPrideMonth === null &&
    company.rainbowFlagAlways === null
);
const againstCount = companies.length - inFavor.length - unknown.length;

const editDataUrl =
  "https://github.com/GenosseOtt/stillproud/issues/new?template=unternehmen_updaten.yml";

const data = [
  { name: "Yes", value: inFavor.length, color: "#AEE2A9" },
  { name: "Unknown", value: unknown.length, color: "#F8DB97" },
  { name: "No", value: againstCount, color: "#F3C28C" },
];

function iconForCompany(company) {
  if (company.rainbowFlagAlways === true) {
    return "🏳️‍🌈";
  } else if (company.rainbowFlagDuringPrideMonth === true) {
    return "🏳️‍🌈";
  } else if (company.rainbowFlagDuringPrideMonth === false) {
    return "🚫";
  } else {
    return "❓";
  }
}

const companyRows = companies.map((element) => (
  <Table.Tr key={element.name}>
    <Table.Td style={{ marginLeft: "2vw", width: "80vw" }}>
      {element.name}
    </Table.Td>
    <Table.Td className="center-right" style={{ width: "15vw" }}>
      {iconForCompany(element)}
    </Table.Td>
  </Table.Tr>
));

export default function Home() {
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  return (
    <main>
      <Stack
        style={{ padding: "14px" }}
        align="stretch"
        justify="flex-start"
        gap="sm"
      >
        <Flex
          align="end"
          direction="column"
          style={{
            fontSize: "5rem",
            lineHeight: "2.6rem",
            fontFamily: "Inter Black",
            color: "#FCB5B5"
          }}
        >
          <p>Still</p>
          <span style={{ lineHeight: "52px", marginBottom: "8px" }}>
            <span className="rainbow-orange">P</span>
            <span className="rainbow-yellow">r</span>
            <span className="rainbow-green">o</span>
            <span className="rainbow-blue">u</span>
            <span className="rainbow-violet">d</span>
          </span>
          <p>.eu</p>
        </Flex>
        <PieChart style={{ height: "24vh" }} data={data} />
        <span className="headline">
          <span className="count rainbow-green">{inFavor.length}</span>{" "}
          <b>DAX</b> Unternehmen stehen <b>weiterhin</b> solidarisch mit der{" "}
          <b>LGBTQIA+</b> community.
        </span>
        <span className="headline center-right">
          <span className="count sad">{againstCount}</span> <b>NICHT</b>
        </span>
        <span style={{ textAlign: "center", color: "black" }}>
          {unknown.length} noch unbekannt.
        </span>
        <Button
          onClick={() => window.open(editDataUrl, "_blank")}
          color="#FCB5B5"
        >
          Aktualisiere Unternehmen
        </Button>

        <Table.ScrollContainer maxHeight={!isTableExpanded ? 160 : undefined}>
          <Table withRowBorders={false}>
            <Table.Tbody>{companyRows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Button
          style={{ textDecoration: "underline" }}
          color="black"
          variant="transparent"
          size="md"
          onClick={() => setIsTableExpanded(!isTableExpanded)}
        >
          {isTableExpanded ? "Verkleinere Liste " : "Zeige gesamte Liste"}
        </Button>

        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Container size="md">
            <span className="headline sub center-left">Worum geht's?</span>
            <p>
              Diese Seite zeigt eine Liste aller DAX-Unternehmen und ob sie
              während des Pride-Monats oder dauerhaft das Regenbogen-Flagge
              zeigen. Das Ziel ist es, Transparenz zu schaffen und Unternehmen
              zu ermutigen, sich für die LGBTQIA+ Community einzusetzen.
            </p>
          </Container>
          <Container size="md">
            <span className="headline sub center-left">Warum wichtig?</span>
            <p>
              Viele Unternehmen zeigen während des Pride-Monats
              Regenbogenflaggen, aber was passiert danach? Diese Seite soll
              Unternehmen anspornen, nicht nur temporär, sondern dauerhaft für
              die Rechte der LGBTQIA+ Community einzustehen. TODO: honoriere
              Menschen in Unternehmen, die dauerhaft Flagge zeigen.
            </p>
          </Container>
          <Container size="md">
            <span className="headline sub center-left">Mach mit!</span>
            <p>
              {" "}
              Diese Seite ist ein Open-Source-Projekt, das von der Community
              gepflegt wird. Du kannst helfen, indem du fehlende Informationen
              ergänzt oder bestehende aktualisierst.{" "}
              <a href={editDataUrl} target="_blank" rel="noopener noreferrer">
                Klicke hier, um ein Unternehmen zu aktualisieren.
              </a>
            </p>
          </Container>{" "}
        </Flex>
      </Stack>
    </main>
  );
}
