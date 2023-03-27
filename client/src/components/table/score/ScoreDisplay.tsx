import { Grid, Image } from "@chakra-ui/react";

interface Props {
  score: number;
}

export default function ScoreDisplay(props: Props) {
  const displayScore = () => {
    const fives = Math.floor(props.score / 5);
    const remainder = props.score % 5;
    const score = new Array(fives).fill(<Image src={"/puntos/points5.png"} />);
    return [
      remainder > 0 ? <Image key={0} src={`/puntos/points${remainder}.png`} /> : "",
    ].concat(score.map((item, index) => <div key={index+1 }>{item}</div>));
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      p="2"
      my="2"
      border="2px"
      overflowY="scroll"
      h="100px"
      w="100%"
    >
      {displayScore()}
    </Grid>
  );
}
