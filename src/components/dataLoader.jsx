export default async (round, setInitialStateForRound) => {
  const manifest = {
    "37th":
      "https://flowdebates.sfo3.digitaloceanspaces.com/debates/37_ld_2022.json",
    gop: "https://flowdebates.sfo3.digitaloceanspaces.com/debates/gop_debate_1.json",
  };

  let data, response;
  if (round) {
    response = await fetch(manifest[round]);
    data = await response.json();
  } else {
    data = {
      cards: [[]],
      edges: [],
      title: "",
      meta: "",
      tags: {},
      date: "",
      source: "",
      speeches: [0],
      url: "",
      moderators: [],
    };
  }

  setInitialStateForRound(data);
};
