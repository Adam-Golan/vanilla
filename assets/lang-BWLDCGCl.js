const home = {
  HERO: {
    img: "./hero.jpeg",
    header: "welcome to vanilla!",
    subHeader: "Not a framework, but a frame to work with."
  },
  FOOTER: {
    copyrights: "Copyright 2525 Ebenezer Scrooge. All rights reserved."
  }
};
const contactus = {
  HEADER: {
    header: "Contact Us - We're Here (Probably)",
    subHeader: "Get in Touch"
  },
  INTRO: "Got questions, complaints, or just feel like yelling at someone? We're all ears (except when we're not). Pick your favorite way to reach out:",
  BLOCKS: [
    {
      header: "Email",
      content: ['📧 <span class="highlight">support@we-ignore-you.com</span>', "Emails are our favorite! We promise to read your message... eventually."]
    },
    {
      header: "Phone",
      content: ['📞 <span class="highlight">(123) 456-7890</span>', "Call us during working hours, which are random and unpredictable. Good luck!"]
    },
    {
      header: "Social Media",
      content: ['🐦 Twitter: <a target="_blank" href="https://twitter.com/wenotlistening">@WeNotListening</a>', '📸 Instagram: <a target="_blank" href="https://instagram.com/justkiddinghelp">@JustKiddingHelp</a>', "Slide into our DMs... if you dare."]
    },
    {
      header: "Visit Us",
      content: ["📍 404 Nowhere Lane, Imaginary City, UN 00000", "Our office is located in a top-secret location. If you find us, you get a free cookie!"]
    },
    {
      header: "Carrier Pigeon",
      content: ["🐦 Send your bird to the coordinates: 51.5074° N, 0.1278° W", "Please note: delivery times may vary depending on pigeon motivation."]
    }
  ],
  FOOTER: {
    copyrights: "Copyright 2525 Ebenezer Scrooge. All rights reserved."
  }
};
const aboutus = {
  HEADER: {
    header: "about us",
    subHeader: "The tall tale of our company"
  },
  SEPERATORS: {
    team: {
      header: "our team"
    },
    mission: {
      header: "our mission"
    }
  },
  MISSION: "Our Mission At QuantumFluff.com, we believe that innovation lives in the unexpected spaces between logic and imagination. Our journey began with a simple yet revolutionary concept: to transform the ordinary into the extraordinary, one pet video at a time. We're not just a technology company; we're pioneers of digital randomness, creators of algorithms that see beyond the conventional, and believers in the untapped potential of seemingly mundane moments. Our mission is to prove that creativity knows no bounds, that technology can be both intelligent and playful, and that sometimes the most profound insights come from watching a cat knock over a glass of milk. Our commitment is to challenge the status quo, to bring joy and unexpected wonder to the digital landscape, and to remind the world that innovation doesn't always look like what you expect. We're here to turn the ordinary into the extraordinary, one quantum moment at a time.",
  CARDS: [
    {
      image: "./about-us/tonystark.webp",
      title: "Tony Stark",
      description: "CEO, Founder, and President"
    },
    {
      image: "./about-us/natasharomanoff.jpg",
      title: "Natasha Romanoff",
      description: "CFO, Chief Financial Officer, and Treasurer"
    },
    {
      image: "./about-us/steverogers.webp",
      title: "Steve Rogers",
      description: "CTO, Chief Technology Officer, and Chief Architect"
    },
    {
      image: "./about-us/thor.jpg",
      title: "Thor Odinson",
      description: "COO, Chief Operating Officer, and Chief Marketing Officer"
    },
    {
      image: "./about-us/peterparker.webp",
      title: "Peter Parker",
      description: "Intern, Student, and Teacher"
    }
  ],
  FOOTER: {
    copyrights: "Copyright 2525 Ebenezer Scrooge. All rights reserved."
  }
};
const texts = {
  home,
  contactus,
  aboutus
};
export {
  texts
};
