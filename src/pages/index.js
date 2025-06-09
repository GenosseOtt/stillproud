import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PieChart } from "@mantine/charts";
import daxObj from "@site/static/data/dax.json";

import styles from "./index.module.css";
import { Button, Flex, Stack, Table } from "@mantine/core";
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
          }}
        >
          <p>Still</p>
          <span style={{lineHeight: "52px", marginBottom: "8px"}}>
            <span style={{color:"#F3C28C"}}>P</span>
            <span style={{color:"#F8DB97"}}>r</span>
            <span style={{color:"#AEE2A9"}}>o</span>
            <span style={{color:"#97B7D5"}}>u</span>
            <span style={{color:"#BE8FC3"}}>d</span>
          </span>
          <p>.eu</p>
        </Flex>
        <PieChart style={{ height: "24vh" }} data={data} />
        <span className="headline">
          Vor <span className="count">{inFavor.length}</span> <b>DAX</b>{" "}
          Unternehmen weht weiterhin die <b>🏳️‍🌈 Flagge</b> zum{" "}
          <span className="rainbow">Pride Month</span>
        </span>
        <span className="headline center-right">
          Vor <span className="count sad">{againstCount}</span> <b>NICHT</b>
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
      </Stack>
    </main>
  );
}
