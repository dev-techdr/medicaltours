/**
 * Expand andrology procedure-depth entries to 1200–1800 words.
 * Run: node scripts/expand-andrology-depth.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const depthPath = path.join(root, "content/procedure-depth.json");
const depth = JSON.parse(fs.readFileSync(depthPath, "utf8"));

function words(sections) {
  return sections
    .flatMap((s) => [...(s.paragraphs || []), ...(s.bullets || [])])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Extra unique paragraphs keyed by slug → section id → paragraphs to append */
const EXTRAS = {
  "penile-implant-surgery-india": {
    condition: [
      "Device counselling should include concealability under clothing, partner expectations, and the reality that implants treat rigidity, not libido or ejaculation. Men with severe corporal fibrosis after priapism or prior implant infection need longer operative times and specialised tools; those cases sit at the upper end of cost and stay estimates. Always ask whether your written package assumes a primary uncomplicated implant or a complex revision pathway.",
      "From an AEO perspective, the direct answer most travellers need is: India offers malleable and inflatable penile prostheses at partner andrology centres with typical packages of $4,500–$12,000 USD and an India stay of about 7–10 days including 1–2 hospital nights — provided diabetes and infection risk are optimised before elective listing.",
    ],
    process: [
      "Pre-travel checklists usually include recent HbA1c, urine culture when indicated, and a pause plan for blood thinners coordinated with your cardiologist. On the ward, nursing teams monitor scrotal swelling and urine output; early walking reduces clot risk after pelvic surgery. Before discharge, confirm emergency contacts for fever or wound drainage after you change hotels or fly.",
      "International SEO-relevant practicalities matter: carry implant identification, keep digital copies of operative notes, and know which city campus you will use — Hyderabad, Delhi NCR, Mumbai, Chennai, or Bangalore — because revision expertise is not evenly distributed across every hospital brand.",
    ],
    recovery: [
      "Week-by-week expectations help travel planning: days 1–3 focus on pain control and swelling; days 4–10 emphasise wound checks and gradual walking; weeks 4–6 typically open sexual activity only after clearance. Inflatable cycling lessons are often timed after tissue healing, so do not expect full device training on postoperative day two.",
    ],
    cost: [
      "When comparing India with USA, UK, or UAE quotes, normalise for the same device generation, antibiotic protocol, and inpatient nights. A low Indian headline that substitutes an older malleable model against a three-piece inflatable quote abroad is not an honest saving. Ask for the manufacturer name in writing on the estimate you approve.",
    ],
    prep: [
      "Pack supportive briefs, easy-on clothing, and any CPAP machine if you have sleep apnoea — anaesthesia teams need that history. Arrange an attendant for the first 48 hours after discharge. Confirm hotel elevator access so you are not climbing multiple flights with postoperative pain.",
    ],
    aftercare: [
      "Long-term, report auto-inflation problems, pump difficulty, or pain with inflation promptly. Avoid unregulated ‘penile enlargement’ procedures after implant placement. Keep annual urology contact even when living abroad so mechanical issues are caught early.",
    ],
  },
  "peyronies-disease-treatment-india": {
    condition: [
      "Peyronie's plaques can sit dorsally, ventrally, or laterally; hourglass narrowing and hinge instability change reconstructive choices. Pain in the active phase does not always equal a plaque you can feel. Duplex ultrasound after pharmacologic erection, when used, helps separate vascular ED from deformity-driven failure of intercourse — a distinction that prevents operating on the wrong problem.",
      "Answer-first guidance for travellers: stable, functionally limiting curvature is the usual surgical indication; active painful disease is often managed medically first; combined ED plus severe curve frequently points toward implant-based correction rather than plication alone. Typical India packages run about $800–$8,000 USD with an estimated stay of 5–10 days depending on pathway.",
    ],
    who: [
      "Men who recently started traction or oral agents should bring timelines so surgeons do not interrupt useful conservative care prematurely. Conversely, men who delayed care until intercourse became impossible should expect counselling about length trade-offs and possible staged treatment if infection risk or glucose control is poor on arrival.",
    ],
    process: [
      "Measurement protocols vary: some surgeons use goniometers after induced erection in clinic; others rely on standardised patient photography. Agree how deformity will be documented so postoperative comparisons are fair. If injectable courses are planned, ask how many vials are included and what happens if you must fly home between doses.",
      "For GEO intent from the Gulf and East Africa, discreet scheduling and male-only waiting areas are frequently requested — raise privacy preferences early so the international desk can accommodate without last-minute changes.",
    ],
    recovery: [
      "After plication, expect bruising and temporary numbness discussions; after grafting, expect longer activity limits and closer wound surveillance. Sexual rehab instructions may include phosphodiesterase inhibitors even when preoperative erections were adequate, to support tissue oxygenation — follow only what your surgeon prescribes.",
      "Hotel planning should assume you will not walk extensively for sightseeing in the first postoperative week after grafting or implant-combined cases. Build buffer nights rather than a tight outbound connection.",
    ],
    cost: [
      "Cost drivers include graft material, concurrent implant, overnight stay, and imaging. Directional USA ranges of $5,000–$25,000 reflect device and facility fees that often dwarf Indian packages for similar complexity — still compare clinical match first. Reject quotes that do not state whether residual-curve revision would be billed separately.",
    ],
    alternatives: [
      "Shockwave and many oral agents lack strong evidence for correcting established deformity; be cautious of clinics marketing them as guaranteed straighteners. Traction can be adjunctive in selected protocols. The credible decision tree remains: observe or medically manage active disease; inject when appropriate and available; operate when stable and function is impaired; implant when ED dominates.",
    ],
    prep: [
      "Photograph documentation should be private, consented, and stored securely. List all ED medicines and prior steroid injections into plaques. If you have lichen sclerosus or urethral symptoms, say so — concurrent disease changes counselling.",
    ],
    aftercare: [
      "Final cosmetic judgement waits until swelling settles over months. Early ‘failure’ anxiety is common; scheduled tele-photo reviews can reassure when clinically appropriate. If new erectile failure appears after curvature surgery, escalate promptly rather than waiting a year in silence.",
    ],
    geo: [
      "Patients comparing India with Turkey, Thailand, or home Gulf private hospitals should weigh microsurgical and implant volume, English discharge documentation, and written device brands — not only flight time. TechdrHealth helps shortlist campuses matched to deformity severity and ED status.",
    ],
  },
  "micro-tese-sperm-retrieval-india": {
    condition: [
      "Micro-TESE differs from random TESE by using optical magnification to sample tubules that appear dilated and opaque, which correlate with spermatogenesis more often than scarred areas. Operative time can be long when both testes are explored systematically. Histopathology of sampled tissue may refine future counselling even when sperm are not found for ICSI that day.",
      "Direct answer for international couples: surgical sperm retrieval packages in India commonly cost about $1,500–$4,500 USD before IVF cycle fees, with an estimated male stay of 4–7 days — longer if a fresh ICSI cycle is synchronised with ovarian stimulation.",
    ],
    who: [
      "Men with cryptozoospermia (rare sperm in ejaculate) sometimes still need retrieval planning if ejaculated sperm are non-usable; that nuance belongs in remote review. Prior unsuccessful conventional TESE does not automatically preclude micro-TESE, but scarred testes are harder and expectations must be reset.",
    ],
    process: [
      "Fresh versus freeze-all strategies hinge on lab confidence with testicular sperm and the female partner’s stimulation response. Some centres prefer freeze-thaw testicular sperm to avoid egg retrieval on a day with zero yield; others argue fresh use in selected cases. Ask which philosophy your lab follows and why.",
      "Consent forms should mention possible testosterone decline, need for hormone follow-up, and the possibility of finding sperm insufficient in number or quality for ICSI even when ‘retrieval positive’ is reported.",
    ],
    recovery: [
      "Scrotal haematoma risk means you should know how to contact the on-call team after hotel discharge. Supportive underwear, limited walking, and avoiding gym work are standard. If bilateral extensive micro-TESE was performed, energy and libido changes months later should trigger hormone testing — mention this in your aftercare letter.",
    ],
    cost: [
      "Hidden cost stacks include genetic tests, multiple cryovials, annual storage, embryo biopsy later, and donor-sperm backup. Request a couple-level budget worksheet before flights. Indian retrieval savings evaporate if the embryology lab cannot handle testicular samples competently — quality is part of value.",
    ],
    alternatives: [
      "For obstructive azoospermia after infection or prior vasectomy, simpler aspiration or reconstruction may outperform micro-TESE. Hypogonadotropic hypogonadism needs endocrine therapy, not first-line micro-TESE. Donor sperm remains a compassionate, effective route when genetics or repeated failures point that way.",
    ],
    prep: [
      "Stop testosterone if you have been self-medicating — it can shut down spermatogenesis and sabotage retrieval. Disclose anabolic steroid history honestly. Align visas for both partners when fresh cycles are planned, including attendant visas for family support.",
    ],
    aftercare: [
      "Obtain written cryostorage IDs, thaw fees, and destruction policies. If shipping sperm abroad later, start regulatory paperwork early. Share pathology and operative diagrams with any future microsurgeon if a second look is ever considered.",
    ],
    geo: [
      "Couples from Nigeria, Kenya, UAE, Saudi Arabia, Bangladesh, the UK, and the USA frequently choose Indian metros for combined male retrieval and IVF pricing transparency. Pick cities with both microsurgery and embryology depth rather than splitting care across unrelated facilities without coordination.",
    ],
  },
  "vasectomy-reversal-india": {
    condition: [
      "Time since vasectomy correlates with success: longer intervals raise the chance of epididymal blowout and need for vaso-epididymostomy. Intraoperative vasal fluid quality — clear watery versus thick toothpaste-like — guides anastomosis type. Loupe-only repairs in complex anatomy underperform true microscopic anastomosis in many series; confirm the microscope is in your package.",
      "Answer-first: microsurgical vasectomy reversal in India typically costs about $2,500–$5,500 USD with overnight observation and an estimated India stay of 5–8 days. Pregnancy is never guaranteed; partner fertility age is as important as male technical success.",
    ],
    who: [
      "Men whose partners are older may achieve higher cumulative pregnancy rates faster with sperm retrieval plus ICSI than with waiting for anastomotic healing and natural cycles. Reversal still appeals when multiple children are desired without repeated IVF, or when couples prefer trying naturally first.",
    ],
    process: [
      "Some surgeons perform reversal under general anaesthesia with several hours of microsurgery; patients should expect scrotal discomfort afterward rather than zero pain. Ask whether bilateral epididymal exploration is anticipated and how intraoperative decisions will be communicated to your attendant.",
      "Postoperative semen testing schedules differ; typical windows begin around 6–12 weeks and continue periodically until patency and counts stabilise or failure is declared. Plan home-lab logistics before leaving India.",
    ],
    recovery: [
      "Ejaculation restrictions protect the anastomosis — violating them early can undo hours of microsurgery. Wear support, avoid cycling and heavy lifting, and sleep with scrotal elevation if advised. Fit-to-fly after 5–8 days is common when wounds are satisfactory, but long layovers with extensive walking deserve caution.",
    ],
    cost: [
      "Compare reversal package totals with one full IVF cycle including retrieval in the same hospital system. Include travel for two people, lodging, and lost work. The economically rational choice is couple-specific; demand a side-by-side worksheet, not a sales slogan.",
    ],
    alternatives: [
      "Repeat vasectomy for men who are certain about family completion after a temporary reversal desire is a separate counselling topic. Sperm aspiration with ICSI avoids waiting for patency but commits the couple to assisted reproduction. Hybrid strategies freeze sperm during reversal when fluid is poor.",
    ],
    prep: [
      "Bring the original vasectomy note if it exists — incision sites and clip versus excision technique help planning. Stop smoking to improve microvascular healing. Arrange work leave that covers both travel and activity limits after return.",
    ],
    aftercare: [
      "If azoospermia persists after adequate follow-up intervals, pivot to retrieval/ICSI rather than indefinite hope. Late strictures can occur after initial patency; repeat semen tests if pregnancy does not follow despite sperm return.",
    ],
    geo: [
      "High-volume microsurgical reversal is concentrated in selected Indian urology–andrology centres. TechdrHealth matches obstructive interval and partner age to teams that perform vaso-epididymostomy regularly, not only straightforward vaso-vasostomy.",
    ],
  },
  "hydrocele-surgery-india": {
    condition: [
      "Adult hydroceles may communicate with the abdomen in some congenital patterns, but most primary vaginalis hydroceles are non-communicating fluid sacs. Chronic thick-walled hydroceles after filariasis or repeated aspiration behave differently from thin idiopathic sacs — operative time and drain use change accordingly. Ultrasound also screens for tumours that can rarely present with reactive hydrocele; that is why imaging before elective travel packages matters.",
      "Answer-first for medical travellers: hydrocele repair in India typically costs about $800–$2,000 USD, is often day-care or one night in hospital, and usually fits a 4–6 day India stay before fit-to-fly clearance.",
    ],
    who: [
      "Men with sudden painful swelling need emergency pathways for torsion, infection, or haemorrhage — not delayed tourism scheduling. Elective candidates should have stable, chronic, or slowly progressive swelling that interferes with walking, clothing, or sexual comfort.",
    ],
    process: [
      "Jaboulay eversion and Lord's plication are among classic techniques; surgeons choose based on sac thickness and preference. Drains, when used, are usually brief. Pathology of excised tissue is sometimes sent when the lining looks atypical — ask whether histology is included.",
      "Bilateral repair in one anaesthetic can be efficient for travellers but increases early swelling and may extend discomfort; discuss staging if you prefer a lighter recovery before a long flight.",
    ],
    recovery: [
      "Expect the scrotum to look bruised and bulky initially; that does not mean the hydrocele ‘came back’ on day three. Supportive underwear and limited standing help. Sexual activity waits for wound comfort and surgeon clearance — often a few weeks.",
      "Long-haul flights after day-care surgery are usually acceptable once pain is controlled and there is no expanding haematoma, but aisle seats and walking breaks reduce clot risk on very long sectors.",
    ],
    cost: [
      "Quotes should state unilateral versus bilateral, anaesthesia type, overnight inclusion, and ultrasound. USA ranges around $4,000–$10,000 illustrate typical self-pay gaps. Filariasis-endemic travellers should also budget for possible medical therapy if active infection is found — that sits outside a simple hydrocelectomy package.",
    ],
    alternatives: [
      "Aspiration offers temporary relief for men unfit for surgery but recurs. Sclerotherapy is practised selectively and is not universally first choice. Observation remains correct for small asymptomatic hydroceles discovered incidentally on scan.",
    ],
    prep: [
      "Shave protocols differ — many hospitals clip in theatre rather than asking you to shave at the hotel. Disclose blood thinners early. Pack several pairs of firm supportive briefs sized for swelling.",
    ],
    aftercare: [
      "Red flags include fever, wound discharge, rapidly increasing asymmetry, or vomiting with severe pain. Mild numbness near the incision can occur. Residual firmness at four to six weeks should be reviewed rather than self-diagnosed as failure.",
    ],
    geo: [
      "Patients from East and West Africa, the Middle East, and South Asia often combine hydrocele repair with other urology or andrology visits. Choose campuses with ultrasound and day-care OT flexibility so your 4–6 day calendar stays efficient.",
    ],
  },
  "circumcision-phimosis-treatment-india": {
    condition: [
      "Adult phimosis from lichen sclerosus (balanitis xerotica obliterans) can involve the meatus; circumcision alone may not finish the story if meatal stenosis needs attention. Diabetic balanitis often improves with glucose control and antifungals before elective cutting. Elective religious or cultural circumcision in adults deserves the same infection-risk counselling as medical circumcision.",
      "Answer-first: adult circumcision and phimosis surgery in India typically costs about $400–$1,200 USD as day-care care, with an estimated stay of 3–5 days for assessment, procedure, and wound check before flying.",
    ],
    who: [
      "Men with recurrent tearing, ballooning on urination, or inability to clean under the foreskin are classic medical candidates. Those seeking cosmetic redesign with unrealistic ‘guaranteed perfect symmetry’ expectations need careful counselling — biology and healing vary.",
    ],
    process: [
      "Sleeve resection is common in adults for controlled cosmetic margins; forceps-guided techniques vary by surgeon training. Dissolvable sutures reduce removal visits — helpful for travellers. Local anaesthesia with sedation can shorten recovery versus full general anaesthesia in selected men.",
      "If lichen sclerosus is suspected, request histology and written advice on long-term meatal surveillance. International patients should leave with clear ointment schedules rather than verbal-only instructions.",
    ],
    recovery: [
      "Days 1–3: swelling, sensitivity, and ointment routines. Days 4–10: sutures soften, bruising fades, walking becomes easier. Weeks 2–6: gradual return to sexual activity only when cleared. Flying at day 3–5 is common if the wound is clean and pain mild.",
      "Avoid pools and ocean swimming until cleared. Sand and humidity on beach stopovers can irritate fresh wounds — plan layover cities accordingly.",
    ],
    cost: [
      "Price variation tracks anaesthesia choice, private room add-ons, and histology. Directional USA ranges of $2,000–$6,000 show typical savings, but the clinical goal is safe healing, not the cheapest theatre slot. Emergency paraphimosis reduction is a different bill and timeline.",
    ],
    alternatives: [
      "Preputioplasty is sometimes discussed to preserve foreskin in selected scarring patterns, though adult indications are narrower than in paediatric practice. Topical steroids need correct diagnosis — steroids on fungal balanitis can worsen it.",
    ],
    prep: [
      "Treat obvious infection first. Bring loose garments. Discuss privacy preferences for ward accommodation. If you must fly within 72 hours for work, say so — the team may advise delaying elective circumcision.",
    ],
    aftercare: [
      "Fibrinous yellow exudate can look like pus to untrained eyes; ask for a photo guide of normal healing. True infection brings spreading redness, fever, or foul discharge. Complete antibiotics if prescribed even when you feel fine.",
    ],
    geo: [
      "Discreet adult circumcision is a frequent request from Gulf and African travellers using Hyderabad, Delhi NCR, Mumbai, Chennai, and Bangalore campuses. TechdrHealth schedules privacy-conscious slots and written aftercare for home GPs.",
    ],
  },
  "testosterone-replacement-therapy-india": {
    condition: [
      "Morning total testosterone below guideline thresholds on repeated tests, with symptoms, supports deficiency diagnosis; grey-zone results may need free testosterone estimation. High SHBG, obesity, and illness confuse interpretation. Pituitary MRI enters the pathway when LH/FSH patterns or prolactin/visual symptoms suggest secondary hypogonadism — that discovery can be more important than starting gel.",
      "Answer-first: structured TRT evaluation and treatment start in India commonly costs about $300–$1,500 USD with a 3–5 day outpatient stay. Ongoing medicine is extra. Fertility goals can make standard TRT the wrong first prescription.",
    ],
    who: [
      "Men recovering from anabolic steroid abuse need specialised recovery protocols, not casual high-dose TRT. Older men with prostate histories need shared decision-making about monitoring intensity. Shift workers should time labs carefully — afternoon draws mislead.",
    ],
    process: [
      "Formulation choice weighs daily gel discipline versus injectable intervals, skin transfer risk, and local pharmacy continuity after you return home. Some countries restrict importation of testosterone products; your start-in-India plan must include a legal continuity path, not a suitcase full of undeclared vials.",
      "Baseline haematocrit and age-appropriate PSA testing, when indicated, belong in the package discussion. Sleep apnoea screening questions should be routine before escalating doses.",
    ],
    recovery: [
      "There is no surgical recovery, but symptom response is gradual: energy and libido changes may appear over weeks, body-composition shifts over months. Do not escalate doses yourself if week-one results feel subtle. Fit-to-fly is unrestricted for medical TRT visits.",
    ],
    cost: [
      "Compare India workup fees with fragmented private endocrine visits in the USA ($1,500–$6,000 directional) or UK/UAE clinics. The durable cost is monitoring plus medicine over years. A cheap induction without a monitoring letter is poor value.",
    ],
    alternatives: [
      "Clomiphene or hCG protocols may raise testosterone while supporting spermatogenesis in selected men under specialist care. Treating sleep apnoea, losing weight, and stopping opioids can lift testosterone without replacement. ED medicines remain appropriate when levels are normal.",
    ],
    prep: [
      "Pause biotin and disclose bodybuilding supplements that interfere with labs. Schedule morning blood draws on arrival. Decide fertility priorities in writing before the consult so counselling is not rushed.",
    ],
    aftercare: [
      "If haematocrit rises, dose adjustment, donation protocols where legal, or formulation changes may be required — do not ignore lab emails. Partners should avoid gel contact areas. Reassess need for therapy periodically rather than assuming lifelong automatic refills.",
    ],
    geo: [
      "Travellers from the Middle East, Africa, UK, and USA use Indian andrology/endocrine teams for confirmatory diagnosis when home clinics feel dismissive or purely commercial. Choose centres that document monitoring for your home physician.",
    ],
  },
  "premature-ejaculation-treatment-india": {
    condition: [
      "Lifelong PE often appears from the first sexual experiences; acquired PE begins after a period of normal control and should trigger ED, thyroid, prostatitis, and relationship screens. Intravaginal ejaculatory latency time (IELT) helps research, but real-world care also weighs distress and interpersonal difficulty. Self-diagnosis from internet timers without context leads to wrong drugs.",
      "Answer-first: premature ejaculation programmes in India typically cost about $400–$2,000 USD to evaluate and start therapy, with a 3–5 day outpatient stay. Durable gains usually continue with practice after you fly home.",
    ],
    who: [
      "Men who only last longer with alcohol are not ‘cured’ — substance-dependent control is a warning. Those with depression need integrated mental-health care; adding serotonergic PE drugs without oversight can be hazardous.",
    ],
    process: [
      "Behavioural methods require privacy to practise; hotel stays during the India visit can be used for structured homework between sessions. Topical agents need precise application timing and partner protection counselling. Oral on-demand versus daily dosing strategies differ by drug class and lifestyle.",
      "If erectile firmness is marginal, PDE5 inhibitors may be combined thoughtfully — the clinic should explain the rationale rather than handing two unmarked blister packs.",
    ],
    recovery: [
      "No surgical downtime applies. Expect an adjustment period on medicines lasting days to weeks. Sexual confidence often lags behind stopwatch improvements; counselling addresses that gap. Fly-home plans are unrestricted for outpatient PE care.",
    ],
    cost: [
      "Packages that include only a bottle of tablets without counselling are incomplete. Directional USA specialist ranges of $2,000–$8,000 show why transparent Indian programmes appeal — still prioritise clinical method over price. Budget ongoing pharmacy costs at home.",
    ],
    alternatives: [
      "Psychosexual therapy alone helps selected lifelong PE. Pelvic-floor physiotherapy and mindfulness-based protocols appear in some programmes. Stopping recreational stimulants and treating sleep debt can improve acquired PE.",
    ],
    prep: [
      "Note whether PE occurs with masturbation as well as partner sex — patterns guide diagnosis. List SSRIs, tramadol, and herbal ‘delay’ products already tried. Decide if your partner will join sessions and brief them respectfully beforehand.",
    ],
    aftercare: [
      "Track latency, distress, and side effects in a simple diary for tele-follow-up. Do not combine multiple serotonergic agents from different doctors. If ED appears after PE treatment starts, report it — dose or strategy may need change.",
    ],
    geo: [
      "Confidential PE care draws patients from Gulf states, East Africa, South Asia, the UK, and the USA to Indian andrology clinics with English counselling. TechdrHealth emphasises privacy-first scheduling across major metros.",
    ],
  },
  "azoospermia-treatment-india": {
    condition: [
      "Absolute azoospermia must be distinguished from cryptozoospermia using proper lab centrifugation. Obstructive clues include normal FSH, normal testis volume, and absent vas in congenital bilateral absence. Non-obstructive clues include small testes and elevated FSH. Mixed pictures exist; exam and genetics still rule.",
      "Answer-first: azoospermia evaluation and male surgical components in India commonly span about $1,000–$6,000 USD, with couple IVF fees extra, and an estimated stay of 5–10 days depending on whether micro-TESE or reconstruction is performed in the same trip.",
    ],
    who: [
      "Men with prior chemotherapy need oncology-aware fertility counselling and realistic retrieval odds. Those with CBAVD need CFTR counselling for themselves and partners before ICSI. Post-vasectomy obstruction belongs in the reversal-versus-retrieval decision framework.",
    ],
    process: [
      "A high-quality pathway sequences labs → classification → shared decision → procedure → embryology outcome → written next steps. Skipping classification to jump to micro-TESE wastes money when obstruction was reconstructible. Conversely, endless vitamins without retrieval planning wastes female reproductive time.",
      "International couples should clarify embryo shipping, freezing limits, and legal parenthood documentation for cross-border care before stimulation starts.",
    ],
    recovery: [
      "Workup-only travellers use 5–7 days; operative travellers use 5–10 days plus possible extended IVF lodging. Emotional recovery after negative retrieval needs support resources — ask the centre what counselling is available before you are in the post-op room.",
    ],
    cost: [
      "Stacked costs include genetics, micro-TESE, cryostorage, stimulation drugs, ICSI, and possible donor cycles. Request a scenario budget: sperm found; sperm not found; donor backup. Indian pricing advantages remain real when itemised honestly against USA ranges often quoted at $8,000–$30,000 for complex male-factor stacks.",
    ],
    alternatives: [
      "Donor sperm, embryo donation where legal, and remaining child-free are valid. Adoption pathways are jurisdiction-specific. Experimental stem-cell claims without evidence should be refused.",
    ],
    prep: [
      "Complete genetics when advised before non-refundable IVF drug purchases. Align both partners’ visas. Decide donor backup boundaries privately as a couple before intraoperative pressure.",
    ],
    aftercare: [
      "Hormone checks after extensive micro-TESE, cryostorage invoices, and embryo disposition forms all belong in your folder. Share complete male workup with any home clinic continuing care so tests are not repeated blindly.",
    ],
    geo: [
      "Azoospermia travel is common from Africa, the Middle East, Bangladesh, the UK, and the USA into Indian fertility–andrology hubs. Choose cities where microsurgery and embryology sit in one coordinated programme.",
    ],
  },
  "varicocele-surgery-india": {
    condition: [
      "Clinical grading (I–III) still matters more than treating every ultrasound ‘pampiniform dilation’ labelled as varicocele. Right-sided only varicoceles raise questions about retroperitoneal pathology in selected contexts. Semen improvement after repair is probabilistic; DNA fragmentation discussions appear in some modern workups but should not become an excuse for indiscriminate surgery.",
      "Answer-first: microsurgical varicocele repair in India typically costs about $1,000–$2,500 USD, is day-care or overnight, and usually fits a 4–7 day India stay. Semen retesting is months later, not during the trip.",
    ],
    who: [
      "Adolescents with documented testicular growth lag may be referred by paediatric urology pathways; adult medical tourists are usually fertility- or pain-driven. Pain candidates need exclusion of other scrotal pain sources so surgery is not a hopeful last resort for unrelated neuropathy.",
    ],
    process: [
      "Subinguinal microsurgical ligation with artery and lymphatic preservation is the workhorse. Laparoscopic clipping is used in selected anatomies or surgeon preference. Embolisation via radiology offers an incisionless alternative in centres that offer it — ask about recurrence counselling for that route too.",
      "Couples already in IVF cycles should decide whether to repair before stimulation, between cycles, or not at all based on female age and prior responses — andrology alone should not dictate IVF timing.",
    ],
    recovery: [
      "Walking is encouraged early; heavy lifting and gym strain are not. Mild ache can wax and wane for weeks. Fit-to-fly after 4–7 days is typical when wounds are fine. Delay semen analysis until the medically advised window so you do not misread early postoperative inflammation as failure.",
    ],
    cost: [
      "Bilateral repair, microscope fees, and overnight stay move quotes within the $1,000–$2,500 band. USA directional $5,000–$12,000 ranges explain medical-tourism interest. Embolisation, if chosen, has a different cost structure — compare like with like.",
    ],
    alternatives: [
      "Observation, analgesia, and embolisation are alternatives. Jumping to IVF without discussing varicocele may be correct when female age dominates; repairing first may be correct for young couples with clear male-factor patterns — personalise.",
    ],
    prep: [
      "Bring ultrasound images, not only a one-line report. List prior scrotal surgeries. Arrange 4–7 day lodging and supportive underwear. Discuss work restrictions for physical jobs after return.",
    ],
    aftercare: [
      "Report fever or severe swelling early. Track pain scores if pain was the indication. For fertility indications, book semen tests in advance at a quality home lab and send results to both your surgeon and fertility clinician.",
    ],
    geo: [
      "Varicocele repair draws men from fertility-focused travel markets across Africa, the Gulf, and the West into Indian microsurgical units linked with IVF centres. TechdrHealth prioritises microscope-confirmed packages over vague ‘laser varicocele’ marketing.",
    ],
  },
  "male-sexual-health-treatment-india": {
    condition: [
      "Sexual health visits fail when clinics sell a single injection protocol to every man regardless of diagnosis. Good andrology maps symptoms to ED, PE, desire disorders, pain/curvature, hormonal status, and relationship context, then sequences care. Post-prostatectomy rehabilitation is its own playbook involving early pharmacologic strategies and realistic timelines for nerve recovery.",
      "Answer-first: male sexual health evaluation and treatment start in India commonly spans about $800–$8,000 USD depending on pathway complexity, with a typical 3–7 day stay for non-surgical care and longer if implant surgery follows.",
    ],
    who: [
      "Men who feel dismissed at home or who fear stigma find structured Indian international desks useful — provided the medicine remains evidence-based. Those seeking only unregulated peptides or permanent enlargement procedures will be redirected toward safer care or declined.",
    ],
    process: [
      "A first visit may end with prescriptions and homework only; that can still be a successful trip if diagnosis was unclear before arrival. Others leave with scheduled second-line procedures on a return visit. Document the stepped plan so you are not upsold mid-trip without reflection time.",
      "Cross-links to dedicated ED, PE, Peyronie's, TRT, and implant pages exist so you can deep-read the pathway you actually need after triage.",
    ],
    recovery: [
      "Non-surgical pathways have no wound recovery; surgical escalations inherit those pages’ stay rules. Psychological recovery — reduced anxiety, rebuilt intimacy — continues at home with practice and sometimes therapy referrals.",
    ],
    cost: [
      "Wide ranges reflect wide pathways. Use focused child pages for precise USD bands. Directional Western self-pay stacks of $3,000–$20,000+ explain demand; still buy clinical fit. Itemise every proposed procedure before approving packages.",
    ],
    alternatives: [
      "Lifestyle medicine, couples therapy, pelvic-floor physiotherapy, and cardiology optimisation are legitimate alternatives or co-therapies. Surgery is last-line for most sexual symptoms except selected Peyronie's and implant indications.",
    ],
    prep: [
      "Arrive with a one-page symptom timeline, medication list, and goals ranked (erection firmness vs ejaculatory control vs desire vs fertility). That ranking prevents scattered care. Arrange 3–7 day lodging with privacy.",
    ],
    aftercare: [
      "Follow the specific leaflet for whatever therapy started. Keep tele-follow-up. Reassess in three months before declaring failure. Escalate deliberately if tablets fail — do not jump to implant marketing without documented stepped care.",
    ],
    geo: [
      "Discreet male sexual health travel is established from Nigeria, Kenya, UAE, Saudi Arabia, Qatar, Bangladesh, the UK, and the USA into Indian andrology centres. TechdrHealth coordinates confidential second opinions and campus matching across major metros.",
    ],
  },
};

for (const [slug, bySection] of Object.entries(EXTRAS)) {
  const sections = depth[slug];
  if (!sections) {
    console.warn("missing", slug);
    continue;
  }
  for (const [id, paras] of Object.entries(bySection)) {
    const section = sections.find((s) => s.id === id);
    if (!section) {
      console.warn("missing section", slug, id);
      continue;
    }
    section.paragraphs = [...(section.paragraphs || []), ...paras];
  }
  const w = words(sections);
  console.log(`${slug}: ${w} words`);
  if (w < 1200 || w > 1800) {
    console.warn(`  ⚠ outside 1200–1800`);
  }
}

fs.writeFileSync(depthPath, JSON.stringify(depth, null, 2) + "\n");
console.log("Wrote procedure-depth.json");
