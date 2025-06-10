import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PieChart } from "@mantine/charts";
import daxObj from "@site/static/data/dax.json";

import styles from "./index.module.css";
import {
  Button,
  Container,
  Flex,
  Grid,
  Paper,
  Stack,
  Table,
} from "@mantine/core";
import { useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

const companies = daxObj.companies.sort((a, b) => a.name.localeCompare(b.name));
const inFavor = companies.filter(
  (company) =>
    company.rainbowFlagDuringPrideMonth === true ||
    company.rainbowFlagAlways === true ||
    company.csdAttendance["2023"] !== null ||
    company.csdAttendance["2024"] !== null ||
    company.csdAttendance["2025"] !== null
);
const unknown = companies.filter(
  (company) =>
    company.rainbowFlagDuringPrideMonth === null &&
    company.rainbowFlagAlways === null &&
    company.csdAttendance["2023"] === null &&
    company.csdAttendance["2024"] === null &&
    company.csdAttendance["2025"] === null
);
const againstCount = companies.length - inFavor.length - unknown.length;

const editDataUrl =
  "https://github.com/GenosseOtt/stillproud/issues/new?template=unternehmen_updaten.yml";

const githubRepoUrl = "https://github.com/GenosseOtt/stillproud/";

const instaUrl = "https://www.instagram.com/stillproud.eu/";

const mailToUrl = "mailto:Johannes.Rupieper@mac.com";

const data = [
  { name: "Yes", value: inFavor.length, color: "#AEE2A9" },
  { name: "Unknown", value: unknown.length, color: "#F8DB97" },
  { name: "No", value: againstCount, color: "#F3C28C" },
];

function iconForCompany(company) {
  let icon = "";
  if (company.rainbowFlagAlways === true) {
    icon = "🏳️‍🌈";
  } else if (company.rainbowFlagDuringPrideMonth === true) {
    icon = "🏳️‍🌈";
  } else if (company.rainbowFlagDuringPrideMonth === false) {
    icon = "🚫";
  }

  if (
    company.csdAttendance["2023"] !== null ||
    company.csdAttendance["2024"] !== null
  ) {
    icon += "🪧";
  } else {
    icon += "❓";
  }

  return icon;
}

const companyRows = companies.map((element) => (
  <Table.Tr key={element.name}>
    <Table.Td style={{ marginLeft: "2vw", width: "80vw" }}>
      {element.name}
    </Table.Td>
    <Table.Td className="center-right" style={{ width: "24vw" }}>
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
            color: "#FCB5B5",
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

        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            onClick={() => window.open(editDataUrl, "_blank")}
            color="#BE8FC3"
          >
            Einträge aktualisieren
          </Button>
          <Container className="info-box" size="md">
            <h3 className="headline sub center-left">Warum wichtig?</h3>
            30% LGBTQIA+ Menschen erfahren Diskriminierung im Arbeitsleben und
            jeder 3. ist gegenüber KollegInnen nicht geoutet! Umso wichtiger ist
            es, dass Unternehmen sich klar positionieren für ein offenes und
            diverses Arbeitsumfeld.
          </Container>
          <Container className="info-box" size="md">
            <h3 className="headline sub center-left">Engagement feiern</h3>
            <p>
              Lasst uns alle Mitarbeitenden in den Unternehmen, die sich für
              LGBTQIA+ täglich stark machen, feiern!
              <br />
              Gemeinsam mit dir möchten wir dieses Engagement zusammentragen und
              langfristig in Erinnerung halten.
            </p>
          </Container>
          <Table.ScrollContainer
            style={{
              borderRadius: "8px",
              padding: "8px",
              backgroundColor: "white",
            }}
            maxHeight={!isTableExpanded ? 240 : undefined}
          >
            <Table captionSide="top" withRowBorders={false}>
              <Table.Tbody>{companyRows}</Table.Tbody>
              <Table.Caption>
                🪧 Teilnahme an Kundgebungen (z.B. CSD) <br />
                🏳️‍🌈 Hissen der Regenbogenflagge während Pride Month oder
                alljährlich <br />❓ Unbekannt -{" "}
                <a href="#contribute">weißt du vielleicht mehr?</a> <br />
              </Table.Caption>
            </Table>
          </Table.ScrollContainer>

          <Button
            style={{ textDecoration: "underline" }}
            color="black"
            variant="transparent"
            size="md"
            onClick={() => setIsTableExpanded(!isTableExpanded)}
          >
            {isTableExpanded ? "Liste minimiere" : "Ganze Liste anzeigen"}
          </Button>

          <Container id="contribute" className="info-box" size="md">
            <h3 className="headline sub">Mach mit!</h3>
            📣 Teil diese Seite <br />
            👩‍💻 Verlinke Engagement in deinem Unternehmen <br />
            🌈 Sprich drüber - auch nach Juni! <br />
          </Container>

          <Button
            onClick={() => window.open(editDataUrl, "_blank")}
            color="#BE8FC3"
          >
            Einträge aktualisieren
          </Button>
        </Flex>
      </Stack>
      <Grid
        justify="center"
        align="center"
        className="footer"
        textAlign="center"
      >
        <Grid.Col span={2}>
          <Button
            onClick={() => window.open(githubRepoUrl, "_blank")}
            color="white"
            className="footer-icon"
            variant="transparent"
          >
            <IconBrandGithub />
          </Button>
        </Grid.Col>
        <Grid.Col className="footer-icon" span={2}>
        <Button
            onClick={() => window.open(instaUrl, "_blank")}
            color="white"
            className="footer-icon"
            variant="transparent"
          >
            <IconBrandInstagram />
          </Button>
          
        </Grid.Col>
        <Grid.Col className="footer-icon" span={2}>
        <Button
            onClick={() => window.open(mailToUrl, "_blank")}
            color="white"
            className="footer-icon"
            variant="transparent"
          >
            <IconMail />
          </Button>
        </Grid.Col>
        {/* <Grid.Col className="footer-text" span={5}>Impressum</Grid.Col> */}
      </Grid>
    </main>
  );
}
