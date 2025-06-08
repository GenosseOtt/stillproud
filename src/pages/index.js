import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PieChart } from "@mantine/charts";
import daxObj from '@site/static/data/dax.json';

import styles from "./index.module.css";
import { Button, Flex, Stack, Table } from "@mantine/core";
import { useState } from "react";

const companies = daxObj.companies.sort((a, b) => a.name.localeCompare(b.name));
const inFavor = companies.filter((company) => company.rainbowFlagDuringPrideMonth === true || company.rainbowFlagAlways === true);
const unknown = companies.filter((company) => company.rainbowFlagDuringPrideMonth === null && company.rainbowFlagAlways === null);
const againstCount = companies.length - inFavor.length - unknown.length;

const data = [
  { name: "Yes", value: inFavor.length, color: "#FCDDF2" },
  { name: "Unknown", value: unknown.length, color: "gray" },
  { name: "No", value: againstCount, color: "#CF8E80" },
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
    <Table.Td width={300}>{element.name}</Table.Td>
    <Table.Td className="center-right" width={100}>{iconForCompany(element)}</Table.Td>
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
          <p>Proud</p>
          <p>.eu</p>
        </Flex>
        <PieChart style={{ height: "24vh" }} data={data} />
        <span className="headline">
          Currently <span className="count">{inFavor.length}</span> <b>DAX</b> companies raise flag for <b>LGBTQIA+</b>
        </span>
        <span className="headline center-right"><span className="count sad">{againstCount}</span> Do <b>NOT</b></span>
        <span style={{textAlign: "center", color: "black"}}>We do not know about {unknown.length}.</span>
        <Button color="#FCB5B5">
          Improve data
        </Button>

        <Table.ScrollContainer maxHeight={!isTableExpanded ? 160 : undefined}>
          <Table withRowBorders={false}>
            <Table.Tbody>{companyRows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        <Button 
          style={{textDecoration:"underline"}} 
          color="black" variant="transparent" 
          size="lg" 
          onClick={() => setIsTableExpanded(!isTableExpanded)}>
            {isTableExpanded ? "Collapse table" : "Expand table"}
        </Button>
      </Stack>
    </main>
  );
}
