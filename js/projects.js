/* ------------------------------------------------------------------
   EDIT THIS FILE to add, remove or change projects.
   Each entry:
     k   "p" = project, "r" = paper replication
     n   name            d  one-line description
     t   topics: ml, bio, drug, cs, rep
     w   path of the project website under harshini-suresha.github.io
     gh  GitHub repo name           app  live Streamlit app URL (optional)
     co  Colab notebook path (optional)   dl  extra "Docking lab" URL (optional)
     dk  data link (optional)       pp  source paper URL (optional)
     pin 1 to pin it at the top
------------------------------------------------------------------- */
window.SITE = {
  W: "https://harshini-suresha.github.io/",
  G: "https://github.com/Harshini-Suresha/",
  C: "https://colab.research.google.com/github/Harshini-Suresha/",
  tags: [["all","all"],["ml","machine learning"],["bio","biology"],["drug","drug discovery"],["cs","systems & algorithms"],["rep","replications"],["live","has live app"]],
  projects: [
{k:"p",n:"MMP-7 Inhibition",d:"Structure-based ligand profiling of MMP-7 inhibitors, with a docking lab that runs in the browser.",t:["drug","bio"],w:"mmp7/",gh:"mmp7",app:"https://mmp7-inhibition.streamlit.app/",co:"mmp7/blob/main/notebooks/MMP7_docking.ipynb",dl:"https://harshini-suresha.github.io/mmp7/docking_lab.html",pin:1},
{k:"p",n:"Honey Bee Genomics",d:"Genomics of behaviour in Apis mellifera, including the Amfor locus on chromosome 13.",t:["bio"],w:"honeybee-genomics/",gh:"honeybee-genomics",co:"honeybee-genomics/blob/main/analysis/amfor_analysis.ipynb",pin:1},
{k:"p",n:"KernelSim",d:"Interactive operating-system simulator: CPU scheduling, page replacement, deadlock avoidance, race conditions and disk scheduling.",t:["cs"],w:"kernelsim/",gh:"kernelsim",app:"https://kernelsim.streamlit.app/",co:"kernelsim/blob/main/KernelSim.ipynb",pin:1},
{k:"p",n:"ML Healthcare AI",d:"Interactive app for four supervised-learning projects: diabetes, breast cancer, heart disease and autism spectrum disorder.",t:["ml"],w:"ml-healthcare-app/",gh:"ml-healthcare-app",app:"https://ml-healthcare-ai.streamlit.app/",co:"ml-healthcare-app/blob/main/ML_Healthcare_Demo.ipynb",pin:1},
{k:"p",n:"3CLPro Bioactivity",d:"Machine-learning models that classify compounds as active or inactive against the SARS-CoV-2 3CLpro protease.",t:["ml","drug"],w:"3clpro-bioactivity/",gh:"3clpro-bioactivity",app:"https://3clpro-bioactivity.streamlit.app/"},
{k:"p",n:"DataSphere-ML",d:"Three models on one synthetic e-commerce dataset in SQL, MongoDB and Neo4j style: customer value, order amount and review rating.",t:["ml"],w:"datasphere-ml/",gh:"datasphere-ml",app:"https://datasphere-ml-i9nv6eofsxkupnbfsdnqrx.streamlit.app/",co:"datasphere-ml/blob/main/datasphere_ml.ipynb"},
{k:"p",n:"Genome Search",d:"Genome search workbench with a static site, a Streamlit app, benchmarks and real example datasets.",t:["bio","cs"],w:"genome-search",gh:"genome-search",app:"https://genome-search.streamlit.app",co:"genome-search/blob/main/notebooks/genome-search-colab.ipynb"},
{k:"p",n:"AlgoBench",d:"Algorithm design and analysis: theory versus measured performance across eight paradigms, with live in-browser benchmarks.",t:["cs"],w:"algobench/",gh:"algobench",app:"https://algobench-ezdmvjxxnpfq7jrkazz2xv.streamlit.app/",co:"algobench/blob/main/AlgoBench.ipynb"},
{k:"p",n:"RouteOpt",d:"Graph-based route optimisation comparing Dijkstra, A*, Bellman–Ford and BFS on one map, plus trie autocomplete and benchmarks.",t:["cs"],w:"routeopt/",gh:"routeopt",app:"https://routeopt-ai.streamlit.app/",co:"routeopt/blob/main/RouteOpt.ipynb"},
{k:"p",n:"NeuroLipin",d:"Multi-level structural and functional annotation of Neuropilin-2 (NRP2), from sequence and domains to structure and interaction networks.",t:["bio"],w:"neurolipin/",gh:"neurolipin",co:"neurolipin/blob/main/NeuroLipin.ipynb"},
{k:"p",n:"Angiotensin AT1R",d:"Structure and molecular-dynamics study of AT118i4h32, an antagonist nanobody of the angiotensin II type 1 receptor (PDB 7T83).",t:["bio","drug"],w:"at1r-nanobody-7T83/",gh:"at1r-nanobody-7T83",app:"https://at1r-nanobody.streamlit.app/",co:"at1r-nanobody-7T83/blob/main/notebooks/AT118i4h32_analysis.ipynb"},
{k:"p",n:"Cellulase-by-Design (DoE)",d:"Design of experiments and statistical optimisation of Aspergillus awamori cellulase production from agricultural waste.",t:["bio"],w:"cellulase-by-design/",gh:"cellulase-by-design",app:"https://cellulase-by-design.streamlit.app/",co:"cellulase-by-design/blob/main/notebooks/cellulase_by_design.ipynb"},
{k:"p",n:"Patient Drug Analysis",d:"Condition-stratified drug ranking from real patient reviews, using shrinkage estimation and interactive analytics.",t:["ml","drug"],w:"patient-drug-analysis/#run",gh:"patient-drug-analysis",app:"https://patient-drug-analysis.streamlit.app/",co:"patient-drug-analysis/blob/main/drug_review_analytics.ipynb"},
{k:"p",n:"LabCheck (Lab Protocol)",d:"A static checker that simulates liquid-handling protocols and flags steps that can’t work before the robot runs them.",t:["bio","cs"],w:"lab-protocol/",gh:"lab-protocol"},
{k:"p",n:"BodyTrack Atlas",d:"Cross-species anatomy index linking 11 organisms to 500+ open imaging datasets, with in-browser analysis.",t:["bio"],w:"bodyatlas/",gh:"bodyatlas"},
{k:"r",n:"scRNA-seq Benchmark Replication",d:"Partial replication of Mereu et al. (2020) benchmarking scRNA-seq protocols, with a dashboard.",t:["bio","rep"],w:"scrna-benchmark-replication/",gh:"scrna-benchmark-replication",dk:"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE133549",pp:"https://doi.org/10.1038/s41587-020-0469-4"},
{k:"r",n:"RNA-seq Replicability Replication",d:"Reproduces Degen & Medo (2025) on how replicable RNA-seq differential expression is with few replicates.",t:["bio","rep"],w:"rnaseq-replicability-replication/",gh:"rnaseq-replicability-replication",dk:"https://portal.gdc.cancer.gov/",pp:"https://doi.org/10.1371/journal.pcbi.1011630"},
{k:"r",n:"NetPert Twist1 Atlas",d:"Reproduction of NetPert (2024) on real Twist1 mammary-organoid data, using only experimental and curated data.",t:["bio","drug","rep"],w:"netpert-twist1-atlas/",gh:"netpert-twist1-atlas",dk:"https://www.ncbi.nlm.nih.gov/sra?term=SRP033275",pp:"https://doi.org/10.1371/journal.pcbi.1012195"},
{k:"r",n:"iDrug Reproduction",d:"CPU-only reproduction of iDrug (2020), drug repositioning and target prediction, on the authors’ real CTD and DrugBank data.",t:["drug","ml","rep"],w:"idrug-reproduction/",gh:"idrug-reproduction",dk:"https://github.com/Case-esaC/iDrug",pp:"https://doi.org/10.1371/journal.pcbi.1008040"},
{k:"r",n:"InterProScan 6 Repro Lab",d:"Reproduction lab for InterProScan 6 using real E. coli and M. tuberculosis proteomes, with benchmarks and 117 in-browser charts.",t:["bio","rep"],w:"interproscan6-repro-lab/",gh:"interproscan6-repro-lab",dk:"https://www.uniprot.org/proteomes",pp:"https://doi.org/10.1093/bioadv/vbag141"},
{k:"r",n:"ProFAB Replication",d:"Reimplements the ProFAB protein functional annotation benchmark on four GO and EC tasks.",t:["bio","ml","rep"],w:"profab-replication/",gh:"profab-replication",dk:"https://profab.kansil.org",pp:"https://doi.org/10.1093/bib/bbac627"},
{k:"r",n:"MAGICAL Reproduction",d:"Reproduction and robustness test of MAGICAL, a PPI-network classifier for synthetic lethal and viable gene pairs.",t:["bio","ml","rep"],w:"magical-repro/",gh:"magical-repro",dk:"https://thebiogrid.org/",pp:"https://doi.org/10.1371/journal.pcbi.1012336"}
  ]
};
