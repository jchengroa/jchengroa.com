export const researchData = {
    "jhs-1": {
        id: "jhs-1",
        category: "research",
        title: "Collecting Solid Waste from Polluted Waters using 'Mega box' Robot",
        summary: "An RC-controlled robot built from a 'Mega Box' to collect floating waste and PPEs from polluted waters.",
        description: "A low-cost, RC-controlled waste-collecting robot designed to recover floating debris and PPEs from calm bodies of water. This investigatory project focuses on utilizing cost-effective materials like a 'Mega Box' chassis combined with brushless motors and high-capacity batteries to address water pollution challenges.",
        tech: ["Robotics", "Embedded Systems", "Hardware Prototyping", "Environmental Sanitation"],
        keywords: ["Sustainability", "Clean Tech", "Marine"],
        stats: [
            { label: "Max Speed", value: "10 kph", detail: "Efficient water travel" },
            { label: "Weight Capacity", value: "50 kg", detail: "High volume collection" },
            { label: "Operation Time", value: "2 Hours", detail: "Continuous mission" }
        ],
        info: "Investigatory Project | Junior High School",
        links: [{ name: "View Full Paper", url: "https://drive.google.com/file/d/1U2mfHWQPqouZG4Q2d1coMnSEGCTOp2_V/view?usp=sharing" }]
    },
    "shs-1": {
        id: "shs-1",
        category: "research",
        title: "Effects of Cabbage (Brassica oleracea) Extract in Prolonging the Shelf-Life of Radish (Raphanus sativus)",
        summary: "A study investigating the efficacy of microwave-extracted cabbage flavonoids in maintaining post-harvest radish quality.",
        description: "This research aimed to extract flavonoids from cabbage waste using microwave-assisted extraction and evaluate their impact on the shelf-life of radishes over a 7-day period. While the treatment did not significantly impact weight loss or signs of decay compared to the control, the study found that all treated groups exhibited significantly improved radish firmness. The 20% concentration treatment was identified as the most effective in preserving the structural integrity of the samples.",
        tech: ["Microwave-Assisted Extraction", "Flavonoid Analysis", "Post-Harvest Preservation", "Shelf-Life Testing"],
        keywords: ["Biochemistry", "Food Science", "Agriculture"],
        stats: [
            { "label": "Firmness P-Value", "value": "0.017", "detail": "Statistically significant improvement in structural integrity." },
            { "label": "Optimal Conc.", "value": "20%", "detail": "Identified as the most effective concentration for maintaining firmness." },
            { "label": "Weight Loss P-Value", "value": "0.915", "detail": "Results showed no significant difference in weight loss compared to control." }
        ],
        info: "SHS Thesis | Senior High School",
        links: [
            { name: "View Full Paper", url: "https://drive.google.com/file/d/1zCyFWjNYuWlXE4_jPsUOIy1Pe0hzzElU/view?usp=sharing" }
        ]
    },
    "shs-2": {
        id: "shs-2",
        category: "research",
        title: "Evaluation of Cytotoxicity and Flavonoid Presence of Cabbage Extract (Brassica oleracea)",
        summary: "Qualitative and biological assessment of microwave-extracted cabbage compounds for safety and phytochemical content.",
        description: "This study focused on identifying flavonoids in cabbage extracts produced via microwave-assisted extraction and assessing their safety through the Allium cepa lethality assay. Phytochemical screening confirmed a strong presence of flavonoids through the alkaline reagent test. Cytotoxicity testing revealed that even at the highest concentration of 50%, the extract had no inhibitory effect on root growth, concluding that the cabbage extract is non-cytotoxic and safe for potential biological applications.",
        tech: ["Phytochemical Screening", "Allium Cepa Assay", "Cytotoxicity Evaluation", "Microwave-Assisted Extraction"],
        keywords: ["Toxicology", "Phytochemistry", "Lab Analysis"],
        stats: [
            { "label": "Flavonoid Presence", "value": "Strong", "detail": "Confirmed via strong yellow color reaction in the Alkaline Reagent Test." },
            { "label": "Cytotoxicity", "value": "Non-Toxic", "detail": "No inhibitory effect on root growth observed in Allium cepa assay." },
            { "label": "Highest Conc.", "value": "50%", "detail": "Tested maximum concentration confirmed safe for biological application." }
        ],
        info: "Capstone Project | Senior High School",
        links: [
            { name: "View Full Paper", url: "https://drive.google.com/file/d/1kQ7vNaTu794-WY5LbNns8bi1vkntqiDZ/view?usp=sharing" }
        ]
    }
};

export const researchList = Object.values(researchData);
