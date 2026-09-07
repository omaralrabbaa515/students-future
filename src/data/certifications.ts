export type CertificationCategory =
  | "برمجة وعلوم الحاسوب"
  | "تطوير الويب والتطبيقات"
  | "الذكاء الاصطناعي وتعلم الآلة"
  | "علم البيانات والتحليلات وقواعد البيانات"
  | "الأمن السيبراني والشبكات ودعم تقنية المعلومات"
  | "الحوسبة السحابية والبنية التحتية"
  | "الصحة العامة والخدمات الطبية"
  | "التنمية المستدامة والعمل الإنساني"
  | "التسويق الرقمي وتطوير الأعمال"
  | "الإنسانيات وإدارة الأعمال والمهارات المهنية";

export type Certification = {
  id: string;
  title: string;
  provider: string;
  url: string;
  category: CertificationCategory;
  summary: string;
  /** أسماء المجالات الأكاديمية التي تستفيد من الشهادة */
  fields: string[];
};

export const certificationCategories: CertificationCategory[] = [
  "برمجة وعلوم الحاسوب",
  "تطوير الويب والتطبيقات",
  "الذكاء الاصطناعي وتعلم الآلة",
  "علم البيانات والتحليلات وقواعد البيانات",
  "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
  "الحوسبة السحابية والبنية التحتية",
  "الصحة العامة والخدمات الطبية",
  "التنمية المستدامة والعمل الإنساني",
  "التسويق الرقمي وتطوير الأعمال",
  "الإنسانيات وإدارة الأعمال والمهارات المهنية",
];

export const certifications: Certification[] = [
  // برمجة وعلوم الحاسوب
  {
    id: "cs50x",
    title: "CS50x — مقدمة إلى علوم الحاسوب",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/x",
    category: "برمجة وعلوم الحاسوب",
    summary:
      "أساسات التفكير الحاسوبي والخوارزميات وهياكل البيانات مع لغات C وPython وSQL وأساسيات الويب، وتنتهي بمشروع نهائي عملي.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات", "الرياضيات", "الهندسة"],
  },
  {
    id: "cs50p",
    title: "CS50P — البرمجة بلغة Python",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/python",
    category: "برمجة وعلوم الحاسوب",
    summary:
      "إتقان Python من الصفر: الدوال، الاستثناءات، المكتبات، التعبيرات النمطية، والاختبارات الآلية.",
    fields: ["علوم الحاسوب", "الرياضيات", "الإحصاء", "الهندسة", "العلوم الأساسية", "الاقتصاد"],
  },
  {
    id: "helsinki-java",
    title: "Java Programming & Data Structures (MOOC)",
    provider: "جامعة هلسنكي",
    url: "https://java-programming.mooc.fi",
    category: "برمجة وعلوم الحاسوب",
    summary:
      "مسار طويل ومتدرج في لغة Java والبرمجة الكائنية وهياكل البيانات مع مئات التمارين المصححة آلياً.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "هندسة الحاسوب", "نظم المعلومات"],
  },
  {
    id: "python-essentials",
    title: "Python Essentials 1 & 2",
    provider: "أكاديمية سيسكو للشبكات",
    url: "https://skillsforall.com",
    category: "برمجة وعلوم الحاسوب",
    summary: "مسار معتمد من سيسكو في أساسيات ومتقدمات Python مع شارة رقمية معترف بها في سوق العمل.",
    fields: ["علوم الحاسوب", "هندسة الشبكات", "نظم المعلومات", "الهندسة", "العلوم"],
  },
  {
    id: "fcc-scientific-computing",
    title: "Scientific Computing with Python & Foundational C#",
    provider: "freeCodeCamp (بالتعاون مع مايكروسوفت)",
    url: "https://freecodecamp.org/learn",
    category: "برمجة وعلوم الحاسوب",
    summary: "شهادتان مجانيتان في الحسابات العلمية بـ Python وأساسيات لغة C# مع مشاريع تطبيقية.",
    fields: ["علوم الحاسوب", "الرياضيات", "الفيزياء", "الهندسة"],
  },
  {
    id: "julia-academy",
    title: "Julia Programming & Data Analysis",
    provider: "Julia Academy",
    url: "https://juliaacademy.com",
    category: "برمجة وعلوم الحاسوب",
    summary: "لغة Julia للحسابات العلمية عالية الأداء وتحليل البيانات والنمذجة الرياضية.",
    fields: ["الرياضيات", "الفيزياء", "الإحصاء", "الهندسة", "علوم الحاسوب"],
  },

  // تطوير الويب والتطبيقات
  {
    id: "fcc-web",
    title: "Responsive Web Design, JavaScript, Front End Libraries, Back End APIs",
    provider: "freeCodeCamp",
    url: "https://freecodecamp.org/learn",
    category: "تطوير الويب والتطبيقات",
    summary:
      "أربع شهادات متتابعة تبني محفظة أعمال كاملة: HTML/CSS، خوارزميات JavaScript، React، وواجهات برمجية خلفية.",
    fields: ["علوم الحاسوب", "نظم المعلومات", "التصميم الجرافيكي", "الإعلام الرقمي", "أي تخصص"],
  },
  {
    id: "fullstackopen",
    title: "Full Stack Open",
    provider: "جامعة هلسنكي",
    url: "https://fullstackopen.com",
    category: "تطوير الويب والتطبيقات",
    summary:
      "تطوير كامل الحزمة بتقنيات React وNode.js وGraphQL وTypeScript وMongoDB مع إمكانية الحصول على ساعات معتمدة.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },
  {
    id: "cs50w",
    title: "CS50W — برمجة الويب بـ Python وJavaScript",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/web",
    category: "تطوير الويب والتطبيقات",
    summary: "بناء تطبيقات ويب باستخدام Django وSQL وJavaScript مع اختبارات ونشر ومشروع نهائي.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },
  {
    id: "cs50mobile",
    title: "CS50 Mobile — تطوير تطبيقات الهاتف بـ React Native",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/mobile",
    category: "تطوير الويب والتطبيقات",
    summary: "تطوير تطبيقات هاتف عابرة للمنصات باستخدام React Native وإدارة الحالة والتنقل.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "التصميم", "نظم المعلومات"],
  },
  {
    id: "cs50games",
    title: "CS50 Games — تطوير الألعاب",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/games",
    category: "تطوير الويب والتطبيقات",
    summary: "أساسيات محركات الألعاب والفيزياء الثنائية والثلاثية الأبعاد باستخدام Lua وUnity.",
    fields: ["علوم الحاسوب", "التصميم الجرافيكي", "الرسوم المتحركة", "الإعلام الرقمي"],
  },

  // الذكاء الاصطناعي
  {
    id: "elements-of-ai",
    title: "Elements of AI & Building AI",
    provider: "جامعة هلسنكي",
    url: "https://elementsofai.com",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary:
      "مدخل عالمي غير تقني إلى مفاهيم الذكاء الاصطناعي، ثم مستوى Building AI للخوارزميات وحلول المشكلات.",
    fields: ["أي تخصص", "الإنسانيات", "إدارة الأعمال", "التربية", "الحقوق"],
  },
  {
    id: "buildingai",
    title: "Building AI",
    provider: "جامعة هلسنكي",
    url: "https://buildingai.elementsofai.com",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "المستوى المتقدم من Elements of AI: خوارزميات التعلم والتحسين وبناء حل ذكي متكامل.",
    fields: ["علوم الحاسوب", "الهندسة", "الرياضيات", "إدارة الأعمال"],
  },
  {
    id: "google-genai",
    title: "Generative AI, Large Language Models & Responsible AI",
    provider: "Google Cloud Skills Boost",
    url: "https://cloudskillsboost.google",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "مسارات جوجل في الذكاء التوليدي والنماذج اللغوية الكبيرة وأخلاقيات الاستخدام المسؤول.",
    fields: ["أي تخصص", "علوم الحاسوب", "التسويق", "الإعلام", "إدارة الأعمال"],
  },
  {
    id: "cs50ai",
    title: "CS50AI — مقدمة إلى الذكاء الاصطناعي بـ Python",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/ai",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "خوارزميات البحث، تمثيل المعرفة، الاحتمالات، التعلم الآلي والشبكات العصبية عملياً.",
    fields: ["علوم الحاسوب", "الرياضيات", "الهندسة", "الفيزياء"],
  },
  {
    id: "fcc-ml",
    title: "Machine Learning with Python",
    provider: "freeCodeCamp",
    url: "https://freecodecamp.org/learn",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "تعلم الآلة العملي باستخدام TensorFlow مع خمسة مشاريع مطلوبة للحصول على الشهادة.",
    fields: ["علوم الحاسوب", "الإحصاء", "الهندسة", "الاقتصاد"],
  },
  {
    id: "ibm-ai-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    provider: "IBM SkillsBuild",
    url: "https://skillsbuild.org",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "شهادة رقمية من IBM في مفاهيم الذكاء الاصطناعي وتطبيقاته وأخلاقياته.",
    fields: ["أي تخصص", "إدارة الأعمال", "التربية", "الإعلام"],
  },
  {
    id: "cognitive-chatbots",
    title: "Building Chatbots with Watson & Natural Language Processing",
    provider: "Cognitive Class (IBM)",
    url: "https://cognitiveclass.ai",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "بناء روبوتات محادثة ذكية ومعالجة اللغة الطبيعية دون خبرة برمجية متقدمة.",
    fields: ["اللغات", "اللغة العربية", "اللغة الإنجليزية", "علوم الحاسوب", "خدمة العملاء"],
  },
  {
    id: "hf-learn",
    title: "Deep Reinforcement Learning & Audio Analysis",
    provider: "Hugging Face",
    url: "https://huggingface.co/learn",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "مسارات عملية في التعلم المعزز العميق ومعالجة الصوت والنماذج مفتوحة المصدر.",
    fields: ["علوم الحاسوب", "الهندسة", "الرياضيات", "علوم الصوت"],
  },
  {
    id: "ms-azure-ai",
    title: "Azure AI Fundamentals",
    provider: "Microsoft Learn",
    url: "https://learn.microsoft.com",
    category: "الذكاء الاصطناعي وتعلم الآلة",
    summary: "أساسيات خدمات الذكاء الاصطناعي على منصة Azure: الرؤية الحاسوبية واللغة والذكاء التوليدي.",
    fields: ["علوم الحاسوب", "نظم المعلومات", "إدارة الأعمال", "الهندسة"],
  },

  // البيانات
  {
    id: "cisco-data-analytics",
    title: "Data Analytics Essentials",
    provider: "أكاديمية سيسكو للشبكات",
    url: "https://skillsforall.com",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "مدخل معتمد إلى تحليل البيانات: الاستخلاص، التنظيف، التصور، ورواية البيانات.",
    fields: ["الإحصاء", "الاقتصاد", "إدارة الأعمال", "المحاسبة", "أي تخصص"],
  },
  {
    id: "fcc-data",
    title: "Data Analysis with Python, D3.js & Relational Databases",
    provider: "freeCodeCamp",
    url: "https://freecodecamp.org/learn",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "ثلاث شهادات في تحليل البيانات بـ Pandas وNumPy، تصور البيانات بـ D3.js، وقواعد البيانات العلائقية.",
    fields: ["الإحصاء", "علوم الحاسوب", "الاقتصاد", "العلوم الأساسية"],
  },
  {
    id: "cs50sql",
    title: "CS50SQL — قواعد البيانات بـ SQL",
    provider: "جامعة هارفارد",
    url: "https://cs50.harvard.edu/sql",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "تصميم قواعد البيانات، الاستعلامات المتقدمة، الفهارس، والتعامل مع بيانات حقيقية كبيرة.",
    fields: ["نظم المعلومات", "المحاسبة", "إدارة الأعمال", "الإحصاء", "علوم الحاسوب"],
  },
  {
    id: "cognitive-data-science",
    title: "Python for Data Science & Databases",
    provider: "Cognitive Class (IBM)",
    url: "https://cognitiveclass.ai",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "مسار IBM في Python لعلم البيانات وقواعد البيانات مع شارات رقمية.",
    fields: ["الإحصاء", "علوم الحاسوب", "الاقتصاد", "العلوم"],
  },
  {
    id: "mongodb-university",
    title: "MongoDB NoSQL Basics",
    provider: "MongoDB University",
    url: "https://learn.mongodb.com",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "أساسيات قواعد البيانات غير العلائقية والنمذجة المستندية والاستعلامات التجميعية.",
    fields: ["علوم الحاسوب", "نظم المعلومات", "هندسة البرمجيات"],
  },
  {
    id: "ibm-big-data",
    title: "Big Data Fundamentals",
    provider: "IBM SkillsBuild",
    url: "https://skillsbuild.org",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "مفاهيم البيانات الضخمة ومنظوماتها وحالات استخدامها في المؤسسات.",
    fields: ["نظم المعلومات", "الإحصاء", "إدارة الأعمال", "الهندسة"],
  },
  {
    id: "ms-azure-data",
    title: "Azure Data Fundamentals",
    provider: "Microsoft Learn",
    url: "https://learn.microsoft.com",
    category: "علم البيانات والتحليلات وقواعد البيانات",
    summary: "أساسيات البيانات السحابية: المخازن العلائقية وغير العلائقية وتحليلات Power BI.",
    fields: ["نظم المعلومات", "المحاسبة", "إدارة الأعمال", "الإحصاء"],
  },

  // الأمن السيبراني والشبكات
  {
    id: "cisco-cyber",
    title: "Cybersecurity, Networking, Endpoint Security, Threat Management, IT Support, Linux",
    provider: "أكاديمية سيسكو للشبكات",
    url: "https://skillsforall.com",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary:
      "حزمة مسارات سيسكو المجانية من أساسيات الشبكات ودعم تقنية المعلومات ولينكس إلى إدارة التهديدات وأمن الأجهزة الطرفية.",
    fields: ["هندسة الشبكات", "علوم الحاسوب", "هندسة الحاسوب", "نظم المعلومات", "أي تخصص"],
  },
  {
    id: "ou-cybersecurity",
    title: "Introduction to Cyber Security",
    provider: "الجامعة المفتوحة (The Open University)",
    url: "https://open.edu/openlearn",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "مدخل إلى إدارة المخاطر الرقمية، التشفير، حماية الهوية، والاستجابة للحوادث.",
    fields: ["أي تخصص", "الحقوق", "إدارة الأعمال", "نظم المعلومات"],
  },
  {
    id: "fcc-infosec",
    title: "Information Security & Penetration Testing",
    provider: "freeCodeCamp",
    url: "https://freecodecamp.org/learn",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "أمن التطبيقات، HelmetJS، واختبار الاختراق مع مشاريع عملية موثقة.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "هندسة الشبكات"],
  },
  {
    id: "ibm-cyber-defense",
    title: "Cyber Defense and Security",
    provider: "IBM SkillsBuild",
    url: "https://skillsbuild.org",
    category: "الأمن السيبراني والشبكات ودعم تقنية المعلومات",
    summary: "مبادئ الدفاع السيبراني ومراكز العمليات الأمنية وتحليل الحوادث.",
    fields: ["نظم المعلومات", "هندسة الشبكات", "علوم الحاسوب"],
  },

  // السحابة
  {
    id: "aws-cloud-practitioner",
    title: "Cloud Practitioner Essentials",
    provider: "AWS Skill Builder",
    url: "https://skillbuilder.aws",
    category: "الحوسبة السحابية والبنية التحتية",
    summary: "أساسيات الحوسبة السحابية على AWS: الحوسبة، التخزين، الشبكات، الأمن والتكلفة.",
    fields: ["علوم الحاسوب", "نظم المعلومات", "الهندسة", "إدارة الأعمال"],
  },
  {
    id: "ms-azure-fundamentals",
    title: "Azure Fundamentals, Identity and Cloud Security",
    provider: "Microsoft Learn",
    url: "https://learn.microsoft.com",
    category: "الحوسبة السحابية والبنية التحتية",
    summary: "مسارات Azure للخدمات السحابية وإدارة الهوية وأمن السحابة.",
    fields: ["نظم المعلومات", "علوم الحاسوب", "هندسة الحاسوب"],
  },
  {
    id: "cognitive-docker",
    title: "Docker Essentials, OpenShift & Blockchain",
    provider: "Cognitive Class (IBM)",
    url: "https://cognitiveclass.ai",
    category: "الحوسبة السحابية والبنية التحتية",
    summary: "الحاويات وتنسيقها على OpenShift وأساسيات سلاسل الكتل.",
    fields: ["علوم الحاسوب", "هندسة البرمجيات", "نظم المعلومات"],
  },
  {
    id: "ibm-quantum",
    title: "Quantum Computing Basics",
    provider: "IBM Quantum Learning",
    url: "https://learning.quantum.ibm.com",
    category: "الحوسبة السحابية والبنية التحتية",
    summary: "مقدمة إلى الحوسبة الكمومية والبوابات والدوائر الكمومية باستخدام Qiskit.",
    fields: ["الفيزياء", "الرياضيات", "علوم الحاسوب", "الهندسة"],
  },

  // الصحة
  {
    id: "openwho",
    title: "مسارات منظمة الصحة العالمية (مكافحة العدوى، إدارة الحوادث، مقاومة مضادات الميكروبات، اللوجستيات الطبية، سلامة المريض، الاستجابة للأوبئة، أخلاقيات الطب)",
    provider: "OpenWHO — منظمة الصحة العالمية",
    url: "https://openwho.org",
    category: "الصحة العامة والخدمات الطبية",
    summary:
      "مسارات قصيرة معتمدة من منظمة الصحة العالمية بشهادات إتمام في الصحة العامة والسلامة والاستجابة للطوارئ.",
    fields: [
      "التمريض",
      "الطب",
      "الصيدلة",
      "المختبرات الطبية",
      "العلاج الطبيعي",
      "الصحة العامة",
      "التغذية",
    ],
  },

  // التنمية المستدامة
  {
    id: "un-sdg-learn",
    title: "SDG:Learn — أهداف التنمية المستدامة",
    provider: "الأمم المتحدة",
    url: "https://unsdglearn.org",
    category: "التنمية المستدامة والعمل الإنساني",
    summary: "مسارات الأمم المتحدة في أهداف التنمية المستدامة وقياس الأثر وتمويل التنمية.",
    fields: ["العلوم السياسية", "الاقتصاد", "الجغرافيا", "الخدمة الاجتماعية", "الإدارة العامة"],
  },
  {
    id: "un-cc-learn",
    title: "UN CC:Learn — تغير المناخ والتمويل الأخضر والمدن المستدامة",
    provider: "الأمم المتحدة",
    url: "https://unccelearn.org",
    category: "التنمية المستدامة والعمل الإنساني",
    summary: "شهادات في سياسات المناخ والتمويل الأخضر والتخطيط الحضري المستدام.",
    fields: ["العلوم البيئية", "الجغرافيا", "الهندسة المدنية", "الاقتصاد", "التخطيط العمراني"],
  },
  {
    id: "worldbank-olc",
    title: "الاقتصاد الدائري وإدارة الموارد المائية والسياسات العامة",
    provider: "البنك الدولي — Open Learning Campus",
    url: "https://olc.worldbank.org",
    category: "التنمية المستدامة والعمل الإنساني",
    summary: "دورات البنك الدولي في السياسات العامة وإدارة المياه والاقتصاد الدائري.",
    fields: ["الاقتصاد", "الإدارة العامة", "الهندسة المدنية", "العلوم البيئية", "الزراعة"],
  },
  {
    id: "disasterready",
    title: "الحد من مخاطر الكوارث والمبادئ الإنسانية وحماية الطفل",
    provider: "DisasterReady",
    url: "https://disasterready.org",
    category: "التنمية المستدامة والعمل الإنساني",
    summary: "مسارات العمل الإنساني الميداني المطلوبة في المنظمات الدولية العاملة في الأردن.",
    fields: ["الخدمة الاجتماعية", "علم النفس", "التربية", "العلوم السياسية", "التمريض"],
  },

  // التسويق الرقمي
  {
    id: "google-skillshop",
    title: "Google Ads (بحث، عرض، فيديو، تسويق تجاري) وGoogle Analytics 4",
    provider: "Google Skillshop",
    url: "https://skillshop.docebosaas.com",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "شهادات جوجل الرسمية في إدارة الحملات الإعلانية وتحليلات المواقع GA4.",
    fields: ["التسويق", "إدارة الأعمال", "الإعلام", "الصحافة", "التصميم", "أي تخصص"],
  },
  {
    id: "hubspot-academy",
    title: "Inbound Marketing, Digital Marketing, Content, Social Media, CRM, Sales Enablement",
    provider: "HubSpot Academy",
    url: "https://academy.hubspot.com",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "حزمة شهادات معترف بها في التسويق الجاذب وإدارة علاقات العملاء وتمكين المبيعات.",
    fields: ["التسويق", "إدارة الأعمال", "الإعلام", "اللغة الإنجليزية", "العلاقات العامة"],
  },
  {
    id: "semrush-academy",
    title: "SEO Fundamentals, PPC & Competitive Market Research",
    provider: "Semrush Academy",
    url: "https://semrush.com/academy",
    category: "التسويق الرقمي وتطوير الأعمال",
    summary: "تحسين محركات البحث، الإعلانات المدفوعة، وأبحاث السوق التنافسية.",
    fields: ["التسويق", "الصحافة", "الإعلام", "اللغات", "إدارة الأعمال"],
  },

  // الإنسانيات والإدارة
  {
    id: "ou-openlearn",
    title: "القانون وحقوق الإنسان وعلم النفس وعلوم الأدلة الجنائية ومسك الدفاتر والوعي المناخي",
    provider: "الجامعة المفتوحة (OpenLearn)",
    url: "https://open.edu/openlearn",
    category: "الإنسانيات وإدارة الأعمال والمهارات المهنية",
    summary: "مئات الوحدات الأكاديمية المجانية مع بيانات مشاركة (Statement of Participation).",
    fields: ["الحقوق", "علم النفس", "الخدمة الاجتماعية", "المحاسبة", "العلوم السياسية", "الإنسانيات"],
  },
  {
    id: "ibm-professional",
    title: "Project Management, Critical Thinking & Design Thinking",
    provider: "IBM SkillsBuild",
    url: "https://skillsbuild.org",
    category: "الإنسانيات وإدارة الأعمال والمهارات المهنية",
    summary: "مهارات إدارة المشاريع والتفكير النقدي والتفكير التصميمي مع شارات رقمية من IBM.",
    fields: ["أي تخصص", "إدارة الأعمال", "الهندسة", "التربية", "الإنسانيات"],
  },
  {
    id: "hp-life",
    title: "Business Concept Development & Financial Modeling",
    provider: "HP LIFE",
    url: "https://life-global.org",
    category: "الإنسانيات وإدارة الأعمال والمهارات المهنية",
    summary: "بناء نموذج العمل التجاري والنمذجة المالية وريادة الأعمال للمشاريع الصغيرة.",
    fields: ["إدارة الأعمال", "المحاسبة", "الاقتصاد", "التمويل", "أي تخصص"],
  },
];

export function getCertificationsByIds(ids: string[]): Certification[] {
  return ids
    .map((id) => certifications.find((c) => c.id === id))
    .filter((c): c is Certification => Boolean(c));
}

export const certificationProviders = Array.from(
  new Set(certifications.map((c) => c.provider)),
).sort((a, b) => a.localeCompare(b, "ar"));
