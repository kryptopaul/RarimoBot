import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Center,
  Button,
  Overlay,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./FeaturesCard.module.css";

interface FeaturesCardProps {
  title: string;
  image: string;
  description: string;
  extraComponent?: React.ReactNode;
}

export function FeaturesCard({ title, image, description, extraComponent }: FeaturesCardProps) {
  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={image} alt="image" radius={'md'} />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="md">
          <div>
            <Text fw={500}>{title}</Text>
            <Text fz="xs" c="dimmed">
                {description}   
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.section}>
          <Group gap={30}>
{extraComponent}
          </Group>
        </Card.Section>

      </Card>
    </>
  );
}
