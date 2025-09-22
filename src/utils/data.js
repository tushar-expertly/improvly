// import { course_images } from "./images";
const courses = [
  // {
  //   id: 1,
  //   title:
  //     "P&PC, SPC/6Sigma, Failure Investigation, Root Cause Analysis, PDCA, DMAIC, A3",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/706879.jpg",
  //   price: 199,
  //   discountedPrice: 249,
  //   rating: 4,
  //   numReviews: 310,
  //   detailsLink: "#",
  //   features: ["John E Lincoln", " 90 Min", "706963"],
  //   description:
  //     "This webinar is intended to provide guidance regarding the CGMPs on manufacturing methods utilizing the US FDA Production and Process Controls for Drugs and Devices and Statistical Process Controls (SPC) as taught by Drs. Demming and others and required also in the CGMPs and under control of variation process guidance.",
  // },
  // {
  //   id: 2,
  //   title: "HVAC and GMP Environmental Control - for Pharmaceutical Cleanrooms",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/703831.jpg",
  //   price: 199,
  //   discountedPrice: 229,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["Roger Cowan", "60 Min", "60 Min"],
  //   description:
  //     "Environmental control of pharmaceutical cleanrooms is essential to the manufacture of a quality product. Control of such conditions as airborne particulate, microorganisms, temperature, humidity, differential pressure, airflow, air velocity and personnel is crucial to protect the product from contamination. Therefore, the design, validation and ongoing monitoring of a cleanroom HVAC system are necessary to assure the quality and safety of the pharmaceutical",
  // },
  // {
  //   id: 3,
  //   title:
  //     "Data Integrity and Privacy: Compliance with 21 CFR Part 11, SaaS/Cloud, EU GDPR",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/701687.JPG",
  //   price: 249,
  //   discountedPrice: 279,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["David Nettleton", "90 Min", "701687"],
  //   description:
  //     "This 21 CFR Part 11 compliance training will guide you through the requirements of Part 11 and will also explain its 3 primary areas: SOPs, product features and validation (10 step risk based approach).",
  // },
  // {
  //   id: 4,
  //   title: "Unauthorized Transactions – Reg E vs Nacha Operating Rules",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/706856.jpg",
  //   price: 199,
  //   discountedPrice: 229,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["Donna K Olheiser", "90 Min", "706856"],
  //   description:
  //     "Unauthorized transactions come in many different forms, when returning using Reg E or the Nacha Operating Rules can be confusing. Discussion will include what, why and when while processing unauthorized returns. The trainer will define the limits of liability and who is liable for what amount while providing some real-life scenarios. Details on the error resolution process with Reg E for consumer notification to the financial institution, research time involved, and",
  // },
  // {
  //   id: 5,
  //   title:
  //     "FDA Compliant Handling of Out-of-Trend Results in Pharmaceutical Quality Control",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/702540.jpg",
  //   price: 229,
  //   discountedPrice: 249,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["Kelly Thomas", "90 Min", "704508"],
  //   description:
  //     "This webinar will discuss the FDA requirements and guidelines for investigating Out-of-trend (OOT) results in the pharmaceutical laboratory. It will also cover FDA compliant documentation of OOT, failure investigations, root causes and CAPA.",
  // },
  // {
  //   id: 6,
  //   title: "Family Care and Medical Leave in California - Part II",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/panelists/jacquiline-wagner/large.png",
  //   price: 14.99,
  //   discountedPrice: 21.99,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["Jacquiline M Wagner", "90 Min", "704508"],
  //   description:
  //     "This series of training programs on Family Care and Medical Leave in California will examine compensation while on leave, continuation of benefits while on leave, employer’s prohibited actions under the CFRA, employee’s return to work policies, and more.",
  // },
  // {
  //   id: 7,
  //   title: "Trial Master File and Clinical Data Management Regulated by FDA",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/705360.jpg",
  //   price: 119,
  //   discountedPrice: 229,
  //   rating: 4,
  //   numReviews: 289,
  //   detailsLink: "#",
  //   features: ["Carolyn Troiano", "60 Min", "60 Min"],
  //   description:
  //     "This FDA compliance training will cover in detail the new requirements for trial master files including documents related to clinical trials that are required to be prepared, collected and maintained as part of the TMF.",
  // },
  // {
  //   id: 8,
  //   title: "Toxic Substance Control Act (TSCA) Awareness Training 101",
  //   imageSrc:
  //     "https://www.complianceonline.com/images/products/large/706205.jpg",
  //   price: 14.99,
  //   discountedPrice: 199,
  //   rating: 4,
  //   numReviews: 249,
  //   detailsLink: "#",
  //   features: ["Joe Keenan", "90 Min", "706205"],
  //   description:
  //     "Attend this training to understand all the requirements of the Toxic Substance Control Act (TSCA), its revisions, and how to develop a written plan, TSCA Training Plan. Get answers to your TSCA questions.",
  // },
];
// const courses = [
//     {
//         id: "xMHCZl",
//         category: "python",
//         image: course_images.python_5,
//         course_name: "Learn Python: The Complete Python Programming Course",
//         description: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
//         rating_count: 3059,
//         rating_star: 4.4,
//         students: 18430,
//         creator: "Avinash Jain, The Codex",
//         updated_date: "9/2015",
//         lang: "english",
//         actual_price: 84.99,
//         discounted_price: 9.99,
//         what_you_will_learn: [
//             "Create their own Python Programs",
//             "Become an experienced Python Programmer",
//             "Parse the Web and Create their own Games"
//         ],
//         content: [
//             "Up and Running With Python",
//             "The Basics(Data Types)",
//             "Conditions and Loops",
//             "Functions!",
//             "Classes! (Object Oriented Programming)",
//             "File Input/Output",
//             "Using Python Modules"
//         ]
//     }
// ];

export default courses;
