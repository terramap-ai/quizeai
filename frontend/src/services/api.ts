import axios from "axios";

const API_BASE_URL =
  "https://quizeai-be.onrender.com/api";
const CSRF_TOKEN =
  "GU4r3YgzbQpbWFcq2hcuo3da0vDbsnTqZ9KScPXD2Mrs1iueye6fLwuFUjkS8vmD";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    "X-CSRFTOKEN": CSRF_TOKEN,
  },
});

// Fallback data to use when API fails
const FALLBACK_QUESTIONS = [
  {
    id: 118,
    category: 4343,
    category_details: {
      id: 4343,
      name: "Home",
      uri: "dmoz/Home",
      parent_category: null,
    },
    question:
      "What is the projected economic growth for Pakistan by June 2025, according to Governor of the State Bank of Pakistan, Jameel Ahmad?",
    answer: "B",
    description:
      "According to Governor Jameel Ahmad, the economic growth of Pakistan is projected to be around 3% by June 2025.",
    options: {
      A: "1%",
      B: "3%",
      C: "5%",
      D: "7%",
    },
    paragraph:
      "April 26, 2025 (MLN): Foreign exchange reserves are expected to reach $14 billion by the end of June and economic growth is projected to be around 3%, Governor of the State Bank of Pakistan, Jameel Ahmad said.\n\nThe Governor reaffirmed Pakistan's improving macroeconomic stability and outlook during high-level meetings with senior executives from global financial and investment institutions, including JP Morgan, Standard Chartered, Deutsche, Jefferies, and major credit rating agencies.\n\nThese engagements took place on the sidelines of the IMF-World Bank Spring Meetings in Washington, D.C.\n\nGovernor Ahmad briefed participants on the tangible progress Pakistan has made in stabilizing its economy, according to the press issued today.\n\nHe highlighted that a prudent monetary policy, combined with sustained fiscal consolidation efforts, has led to macroeconomic stability in the country, the State Bank said in a statement on Saturday.\n\nAhmad highlighted that headline inflation has declined sharply over the past two years, reaching a multi-decade low of 0.7% in March 2025.\n\nMoreover, core inflation has also come down significantly from above 22% to a single-digit and is expected to moderate further in the coming months.\n\nGoing forward, headline inflation is expected to stabilize within its target range of 5 to 7%, he viewed.\n\nRegarding the external account, the Governor informed that Pakistan's FX buffers have registered a substantial qualitative as well as quantitative improvement.\n\nSBP's FX reserves have more than tripled since bottoming out in February 2023, whereas its forward liabilities have also reduced significantly.\n\nAhmad highlighted that unlike previous episodes of reserve build-up, the ongoing rise in external buffers is not due to any further accumulation of external debt.\n\nIn fact, Pakistan's public sector external debt, both in absolute terms and as a percent of GDP, has declined since June 2022.\n\nThe Governor emphasized that this improvement reflects SBP's policy focus on building the economy's resilience against external shocks, including the ongoing trade-related global uncertainty.\n\nHe explained that SBP has been able to build these FX buffers through FX purchases amidst a surplus in the external current account.\n\nHe also shared that SBP is targeting to increase FX reserves to $14bn by June 2025.\n\nGovernor SBP highlighted that as the economic conditions have stabilized, Pakistan's GDP growth is gradually recovering and expected to be around 3% during FY25.\n\nHe pointed out that the improvements in the country's economy have also been recognized by international credit ratings agencies.\n\nGovernor SBP shared that the focus of policymakers has remained to preserve the macroeconomic stability and undertaking structural reforms across different sectors of the economy.\n\nAhmad expressed his confidence that with continued progress on the reform agenda, Pakistan will be able to achieve sustainable economic growth and socioeconomic uplift for its people.",
  },
  {
    id: 117,
    category: 4343,
    category_details: {
      id: 4343,
      name: "Home",
      uri: "dmoz/Home",
      parent_category: null,
    },
    question: "Who has stepped in as interim head coach for Norwich City?",
    answer: "B",
    description:
      "Jack Wilshere has stepped in as interim head coach for Norwich City following the departures of Johannes Hoff Thorup and Glen Riddersholm.",
    options: {
      A: "Michael Carrick",
      B: "Jack Wilshere",
      C: "Riley McGree",
      D: "Alan Irvine",
    },
    paragraph:
      "Jack Wilshere begins life as interim head coach in the Norwich City dugout this afternoon as the Canaries face play-off-chasing Middlesbrough on Teesside.\n\nThe former Arsenal and England international midfielder Wilshere has stepped into the role after the departures of Johannes Hoff Thorup and Glen Riddersholm earlier this week following City's 3-1 Easter Monday defeat to Millwall in the capital.\n\nFAO: ANDROID USERS\n\nIf you are consuming today's live blog on an Android device via the Pink Un app, please use two-finger scrolling to navigate through it or by clicking here\n\nWilshere, 33, joined Norwich from Arsenal, where he was under-18s boss and is hoping to use the final two games of the Championship campaign to stake his claim for the role on a permanent basis.\n\nCity have won just one of their last 10 Championship matches, including six defeats, and are hoping for a reaction this afternoon.\n\nNumber one Angus Gunn is expected to return to the squad after the birth of his baby son over the Easter weekend.\n\nAttacker Ante Crnac is still sidelined after suffering an ankle injury in their 2-1 defeat to Plymouth. He is expected to return for City's final away game of the campaign at Middlesbrough.\n\nWinger Matej Jurasek is also unlikely to be fit as he continues to adapt to the intensity of the division and manages a quad issue that has limited his time on the pitch since signing in January.\n\nDuo Lewis Dobbin and Ben Chrisene are likely to miss the remainder of the Championship campaign after injuries sustained in the 1-1 draw to Blackburn earlier this month.\n\nLucien Mahovo's quad injury has also ended his campaign, with Norwich weighing up whether surgery is the next step. Gabe Forsyth is expected to miss the remainder of the Championship campaign after undergoing knee surgery.\n\nMichael Carrick's side still hold the cards in their push for a top six finish - but need a victory today to advance their claims.\n\nBoro have lost three of their last four Championship matches, including a 2-1 defeat to Sheffield Wednesday last time out. They currently sit seventh in the table, three points behind Coventry who they face on the final day.\n\nBoth Riley McGree and Neto Borges are not expected to be available for this afternoon's clash, but Carrick was hopeful experienced defender Darragh Lenihan could make the matchday squad.\n\nWilshere is hoping to become the first interim boss to record a victory in charge of City since Alan Irvine in his spell in 2017.",
  },
  {
    id: 116,
    category: 4343,
    category_details: {
      id: 4343,
      name: "Home",
      uri: "dmoz/Home",
      parent_category: null,
    },
    question:
      "What is one of the activities children can participate in within the Family Fun Zone?",
    answer: "A",
    description:
      "The article mentions that Sports enthusiasts can look forward to honing their skills with Exeter City's Community Football Club and Exeter Chiefs in the Family Fun Zone.",
    options: {
      A: "Playing soccer with Exeter City's Community Football Club",
      B: "Performing stand-up comedy",
      C: "Cooking lessons",
      D: "Scuba diving",
    },
    paragraph:
      "This article is brought to you by our exclusive subscriber partnership with our sister title USA Today, and has been written by our American colleagues. It does not necessarily reflect the view of The Herald.\n\nThe event, which will take place from May 15 to 17, is introducing this immersive area specifically designed for children, allowing parents to relax while their little ones are entertained.\n\nThe Family Fun Zone will feature a range of activities, including a climbing wall provided by Devon Scouts, which stands at a towering 7m high.\n\nThe wall is equipped with a mechanical Auto-Belay device to ensure climbers' safety.\n\nSports enthusiasts can look forward to honing their skills with Exeter City's Community Football Club and Exeter Chiefs.\n\nFuture sports stars can brush up on their game with these professional teams.\n\nCircus skills will also be on offer, with Elfic the Comedy Juggler providing lessons in Diablo, stilt walking, plate-spinning, and juggling.\n\nCraft lovers can create their own fuzzy farm friends with Pom Stitch Tassell.\n\nChildren can choose from a peeping chick, a floppy bunny, or a cuddly sheep, complete with googly eyes.\n\nA special guest appearance will be made by Patrick the Shetland Pony, the Mayor of Cockington.\n\nPatrick will be in the Family Fun Zone on Saturday only.\n\nThe Family Fun Zone has been designed to offer activities that are either free or low-cost.\n\nThis makes it a budget-friendly option for families attending the show.\n\nIn addition, children can attend the Devon County Show for free on Saturday, May 17.\n\nThe Family Fun Zone has been masterminded by Claire and Molly in the Devon County Show office.",
  },
  {
    id: 115,
    category: 4343,
    category_details: {
      id: 4343,
      name: "Home",
      uri: "dmoz/Home",
      parent_category: null,
    },
    question:
      "Which financial platform's shares are popular among bullish market participants according to the news text?",
    answer: "C",
    description:
      "The text mentions that 'shares of Robinhood Markets Inc. are at the top of the list for those bullish market participants who are only waiting for the volatility to subside.'",
    options: {
      A: "JPMorgan Chase & Co.",
      B: "Goldman Sachs Group, Inc.",
      C: "Robinhood Markets Inc.",
      D: "Bank of America Corporation",
    },
    paragraph:
      "Whenever markets start to behave a certain way around a stock, especially during earnings season, investors usually benefit greatly from reverse-engineering the views taken ahead of the biggest catalyst of the quarter. Typically, there are both technical and fundamental reasons behind the way markets like to treat and value a certain stock (or sector, for that matter), and today, investors have an opportunity to ride this bullish wave.\n\nSpotting a particular behavior around one of the most popular names in the financial sector seems like a no-brainer, as these stocks are ultimately the better hedge against the ongoing volatility caused by President Trump's rollout of trade tariffs, since they do not operate in a way that could affect them. Having set the foundational pillar of strength to start looking into the sector, now investors can drill down into specifics.\n\nThe specifics will eventually show them why shares of Robinhood Markets Inc. NASDAQ: HOOD are at the top of the list for those bullish market participants who are only waiting for the volatility to subside and then get a payoff relative to the patience and savviness involved with investing in such a negative and volatility-driven market nowadays.\n\nWhen it comes to the retail investor of today's market and economy, there are very few platforms that compare to Robinhood and its popularity among its audience. This is something investors can see every time quarterly results are reported, as they carry double-digit growth rates for users and funded accounts.\n\nRobinhood Earnings Call April 30\n\nThat being said, there's also a fundamental truth to what the next quarter might bring for Robinhood's business. Investors can already expect to see continued user growth and deposits. Still, there's a truth to the fees generated during this past quarter that might not be so obvious to most investors.\n\nWith markets being this volatile and Robinhood controlling the majority of the retail investor market, it makes sense to expect higher fees on the relatively high trading volume that the platform can generate, especially now that it has launched a futures trading offer for its customers as well.\n\nOver the past few years, retail investors have become more active in trading options and futures contracts in financial markets. Robinhood spotted this trend from a mile away, and it's also the reason why markets are now willing to pay as much as 29.6x in price-to-earnings (P/E) multiples.\n\nNot only is this valuation multiple a significant premium to the rest of the financial sector's average valuation of 22.0x P/E, indicating that the market must have a very good reason to be willing to overpay this much for Robinhood's business and underlying future earnings.\n\nThe price action tells a similar story here. Over the past month, Robinhood stock has managed to outperform the broader S&P 500 index by as much as 6%, which says volumes about what could come next for this broker and trading platform, as there is a clear preference for this stock over the rest of the stock market.\n\nMore than that, investors have to account for the massive 158.5% performance Robinhood delivered over the past 12 months, leaving not only the market but pretty much all other peers in the dust as it still runs to higher prices. This momentum and fundamental back-up have also attracted new money to pour in the stock recently.\n\nConfidence is clearly building for Robinhood's future. Up to $4.2 billion of institutional capital came in from buyers over the past quarter, with an additional $230 million this quarter (which is made up of only April thus far), a clear sign of better things to come.\n\nThere is also another sentiment gauge to consider in Robinhood stock, and this one is coming from Wall Street analysts. While the consensus price target is still set at only $53.88 per share today, some analysts are willing to back Robinhood with as much confidence as anyone can have during a volatile market like today's.\n\nThose from JMP Securities decided that the underlying developments at Robinhood were enough justification for keeping their Market Outperform rating on the stock while also placing a $70 per share valuation on it (making it the second highest). Considering the timing of this rating, April 2025, it seems clear that Wall Street expects the company to report a favorable quarter in the coming weeks, perhaps sending the stock to these valuations, if not higher.\n\nBefore you consider Robinhood Markets, you'll want to hear this.\n\nMarketBeat keeps track of Wall Street's top-rated and best performing research analysts and the stocks they recommend to their clients on a daily basis. MarketBeat has identified the five stocks that top analysts are quietly whispering to their clients to buy now before the broader market catches on... and Robinhood Markets wasn't on the list.\n\nWhile Robinhood Markets currently has a Moderate Buy rating among analysts, top-rated analysts believe these five stocks are better buys.",
  },
];

export interface QuizQuestion {
  id: number;
  category: number;
  category_details: {
    id: number;
    name: string;
    uri: string;
    parent_category: number | null;
  };
  question: string;
  answer: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  paragraph: string;
  created_at: string;
  updated_at: string;
}

// Helper function to check if the response is valid JSON data
const isValidJsonResponse = (data: any): boolean => {
  // Check if it's an array or object, not HTML
  if (!data || typeof data === "string") {
    return false;
  }

  // If it's an array, it should have at least one question with expected properties
  if (Array.isArray(data)) {
    return data.length > 0 && "question" in data[0] && "options" in data[0];
  }

  return false;
};

export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await apiClient.get("/news/newsqa/?format=json");

    // Check if the response is valid JSON with expected structure
    if (isValidJsonResponse(response.data)) {
      return response.data;
    } else {
      console.warn("API returned invalid data format", response.data);
      console.log("Using fallback questions data");
      return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
    }
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    console.log("Using fallback questions data");
    return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
  }
};

export const fetchCategoryQuizQuestions = async (
  categoryId: number
): Promise<QuizQuestion[]> => {
  try {
    const response = await apiClient.get(
      `/news/newsqa/?category=${categoryId}`
    );

    // Check if the response is valid JSON with expected structure
    if (isValidJsonResponse(response.data)) {
      return response.data;
    } else {
      console.warn(
        "API returned invalid data format for category",
        categoryId,
        response.data
      );
      console.log("Using fallback questions data");
      return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
    }
  } catch (error) {
    console.error(
      `Error fetching quiz questions for category ${categoryId}:`,
      error
    );
    console.log("Using fallback questions data");
    return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
  }
};

export const fetchMixQuizQuestions = async (
  limit: number = 10
): Promise<QuizQuestion[]> => {
  try {
    const response = await apiClient.get(`/news/newsqa/?limit=${limit}&format=json`);

    // Check if the response is valid JSON with expected structure
    if (isValidJsonResponse(response.data)) {
      return response.data;
    } else {
      console.warn(
        "API returned invalid data format for mix questions",
        response.data
      );
      console.log("Using fallback questions data");
      return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
    }
  } catch (error) {
    console.error("Error fetching mix quiz questions:", error);
    console.log("Using fallback questions data");
    return FALLBACK_QUESTIONS as unknown as QuizQuestion[];
  }
};
