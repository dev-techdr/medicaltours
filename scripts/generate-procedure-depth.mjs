/**
 * One-off generator: merges high-demand procedure depth sections into procedure-depth.json.
 * Run: node scripts/generate-procedure-depth.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const procs = JSON.parse(
  fs.readFileSync(path.join(root, "content/procedures.json"), "utf8")
);
const depthPath = path.join(root, "content/procedure-depth.json");
const depth = JSON.parse(fs.readFileSync(depthPath, "utf8"));

const fmt = (n) => "$" + n.toLocaleString("en-US");

function costRange(p) {
  if (!p.costIndia) return "indicative package ranges after clinical review";
  return `${fmt(p.costIndia.min)}–${fmt(p.costIndia.max)} USD`;
}

const DOCTOR_LINKS = {
  "dr-rajesh-kumar-cardiologist": {
    href: "/doctors/cardiology/dr-rajesh-kumar-cardiologist",
    label: "Cardiology profile",
    hub: "/doctors/cardiology",
  },
  "dr-vikram-singh-orthopedic": {
    href: "/doctors/orthopedics/dr-vikram-singh-orthopedic",
    label: "Orthopedic profile",
    hub: "/doctors/orthopedics",
  },
  "dr-anita-sharma-oncologist": {
    href: "/doctors/oncology/dr-anita-sharma-oncologist",
    label: "Oncology profile",
    hub: "/doctors/oncology",
  },
  "dr-meera-nair-neurosurgeon": {
    href: "/doctors/neurosurgery/dr-meera-nair-neurosurgeon",
    label: "Neurosurgery profile",
    hub: "/doctors/neurosurgery",
  },
  "dr-arjun-patel-transplant": {
    href: "/doctors/transplant/dr-arjun-patel-transplant",
    label: "Transplant profile",
    hub: "/doctors/transplant",
  },
  "dr-anil-desai-ent": {
    href: "/doctors/ent/dr-anil-desai-ent",
    label: "ENT profile",
    hub: "/doctors/ent",
  },
  "dr-suresh-mehta-urologist": {
    href: "/doctors/urology/dr-suresh-mehta-urologist",
    label: "Urology profile",
    hub: "/doctors/urology",
  },
};

function buildLinks(p) {
  const links = [];
  const doc = p.doctorSlugs?.[0] ? DOCTOR_LINKS[p.doctorSlugs[0]] : null;
  if (doc) {
    links.push({ href: doc.href, label: doc.label });
    links.push({ href: doc.hub, label: "Specialty doctors" });
  }
  links.push({ href: `/cost-comparison/${p.slug}`, label: "Cost comparison" });
  links.push({ href: "/get-free-quote", label: "Free quote" });
  const seen = new Set();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

function buildSections(p, c) {
  const name = p.name;
  const lower = name.toLowerCase();
  const cost = costRange(p);
  const recovery = p.recoveryTime || "Recovery timelines are confirmed after clinical review.";
  const cities = (p.geoCities || [
    "Hyderabad",
    "Delhi NCR",
    "Mumbai",
    "Chennai",
    "Bangalore",
  ]).join(", ");

  return [
    {
      id: "condition",
      heading: c.conditionHeading,
      paragraphs: c.condition,
    },
    {
      id: "who",
      heading: `Who ${lower} in India is for`,
      paragraphs: c.who,
      bullets: c.whoBullets,
    },
    {
      id: "process",
      heading: "Process for international patients",
      paragraphs: c.process,
    },
    {
      id: "risks",
      heading: "Risks, complications, and mitigation",
      paragraphs: c.risks,
      bullets: c.riskBullets,
    },
    {
      id: "recovery",
      heading: "Recovery timeline and fit-to-fly planning",
      paragraphs: [
        ...c.recovery,
        `Typical guidance on this pathway: ${recovery}. Your surgeon and coordinator confirm a personalised buffer before long-haul flights.`,
      ],
    },
    {
      id: "cost",
      heading: `Cost of ${lower} in India for foreign patients`,
      paragraphs: [
        `Indicative packages for international patients commonly fall around ${cost}, depending on implant or device choice, room category, comorbidities, and whether additional procedures are required. Private care in the USA or UK is often substantially higher for comparable pathways — use the comparison table on this page as a directional guide, not a guarantee.`,
        ...(c.costExtra || []),
        "Always ask what the package includes: surgeon and anaesthesia fees, theatre, standard consumables or implants as quoted, routine labs, inpatient nights, and medications during stay. Typical exclusions are ICU beyond the package, unexpected additional procedures, extended stay, premium implants, and long-term medicines after discharge. Final quotes follow medical review of your reports.",
      ],
    },
    {
      id: "credentials",
      heading: "Doctor credentials and hospital standards",
      paragraphs: [
        c.credentials ||
          `Look for specialists with documented volume in ${lower}, practising in hospitals with JCI and/or NABH accreditation where available, 24/7 critical care, and support services appropriate to the procedure. Named-surgeon clarity on the estimate matters more than a generic international desk booking.`,
        `TechdrHealth shortlists partner teams across ${cities} and helps you obtain written package outlines before travel. Verify credentials on the hospital letter you receive.`,
      ],
      links: buildLinks(p),
    },
    {
      id: "itemisation",
      heading: c.itemHeading || `How to read a ${lower} package without surprises`,
      paragraphs: c.itemisation,
    },
    {
      id: "travel",
      heading: c.travelHeading || "Building a travel calendar around treatment",
      paragraphs: c.travel,
    },
    {
      id: "comprehensive",
      heading: `${name} in India — decision framework for foreign patients`,
      paragraphs: c.comprehensive,
    },
  ];
}

/** @type {Record<string, import('../src/lib/data').DepthSection[]>} */
const NEW_DEPTH = {};

function add(slug, custom) {
  const p = procs.find((x) => x.slug === slug);
  if (!p) {
    console.warn("skip missing slug", slug);
    return;
  }
  if (depth[slug] && !process.argv.includes("--force")) {
    console.warn("skip existing", slug);
    return;
  }
  NEW_DEPTH[slug] = buildSections(p, custom);
}

// --- CARDIAC ---
add("heart-bypass-surgery-cost-india", {
  conditionHeading: "What heart bypass surgery (CABG) is — and when it is chosen",
  condition: [
    "Coronary artery bypass grafting (CABG) creates new routes for blood to reach the heart muscle when coronary arteries are narrowed or blocked. Surgeons use arteries from the chest wall and/or veins from the leg. Bypass may be on-pump with cardiopulmonary bypass or off-pump in selected cases.",
    "CABG is not the only option for coronary disease. Many patients are treated with medicines and stents. Surgery is more often discussed for left main disease, multi-vessel disease with diabetes, failed stents, or anatomy unsuited to durable PCI. Remote review of angiography, echo, and risk scores prevents travelling for the wrong pathway.",
    "International patients should clarify graft strategy, ICU expectations, and whether valve disease will be addressed in the same admission before booking flights.",
  ],
  who: [
    "Typical candidates have significant coronary disease on angiography with symptoms or prognostic indications for revascularisation. Frailty, lung disease, kidney impairment, and prior chest surgery change risk.",
    "Medical travellers often seek CABG in India when US or UK self-pay quotes are high or waits are long. Triage covers whether hybrid PCI is reasonable and whether an attendant should stay for early recovery.",
  ],
  whoBullets: [
    "Recent coronary angiography for remote review",
    "Echo and basic labs available",
    "Diabetes, blood pressure, and smoking status documented",
    "Willing to stay for hospital plus recovery buffer",
    "Attendant plan for first postoperative weeks",
  ],
  process: [
    "Share angiography, echo, medication lists, and allergies. Centres propose operative plan, expected stay, and package outline. Settle graft conduit preferences and ICU expectations before flights.",
    "Pre-op assessment confirms fitness and consent. Postoperative ICU monitoring, early mobilisation, and cardiac rehab education follow. Discharge planning covers antiplatelets, wound care, and red-flag symptoms.",
  ],
  risks: [
    "Risks include bleeding, transfusion, infection, stroke, kidney injury, atrial fibrillation, and graft failure over time. Mitigation requires experienced teams and ICU backup in accredited hospitals.",
  ],
  riskBullets: ["Bleeding", "Stroke", "Infection", "Kidney injury", "Arrhythmias", "Prolonged ICU"],
  recovery: [
    "Most patients spend time in ICU/HDU then ward care. Sternotomy precautions and pulmonary toilet are central. Long-haul flights are deferred until wound stability and clinical clearance.",
  ],
  costExtra: ["Confirm ICU nights included and what triggers additional billing for ventilation or dialysis."],
  itemisation: [
    "Require clarity on surgeon fees, theatre, grafts, ICU nights, ward nights, and physiotherapy. Share recent stent history for safe antiplatelet planning.",
  ],
  travel: [
    "Calendar: remote review → visa letter → arrival → surgery → hotel buffer → fit-to-fly. Unstable angina may need accelerated pathways.",
  ],
  comprehensive: [
    "Choose India for CABG when accredited centres offer clear packages and surgical volume for your anatomy — not only a low headline price. Demand named surgeons and written inclusions.",
  ],
});

add("angioplasty-stent-placement-cost-india", {
  conditionHeading: "What angioplasty and stent placement involve",
  condition: [
    "Coronary angioplasty opens narrowed heart arteries, usually with balloon expansion and stent placement. Drug-eluting stents are common. Access is typically radial or femoral under local anaesthesia with sedation.",
    "Stenting treats selected blockages; medicines and lifestyle remain essential. Complex disease may still favour CABG after heart-team discussion.",
    "Share angiography early so centres advise ad-hoc stenting, staged PCI, or surgery before you fly.",
  ],
  who: [
    "Candidates have documented ischaemic symptoms or positive testing with suitable anatomy. Emergency STEMI pathways differ from elective stable angina.",
    "Travellers choose India for elective PCI when device costs at home are high. Triage includes kidney function and dual antiplatelet plans.",
  ],
  whoBullets: ["Angiography available", "Recent creatinine", "Allergy history", "Antiplatelet plan understood"],
  process: [
    "Remote review proposes access route and stent complexity. Post-procedure monitoring watches bleeding, chest pain, and kidney function. Do not stop antiplatelets without cardiology advice.",
  ],
  risks: ["Bleeding, vessel injury, contrast nephropathy, stent thrombosis, restenosis."],
  riskBullets: ["Access-site bleeding", "Contrast kidney injury", "Stent thrombosis", "Restenosis"],
  recovery: ["Many elective patients leave within 1–3 days. Avoid heavy lifting on the access side as advised."],
  itemisation: ["Clarify stent count, brands, and costs for IVUS/OCT or complex tools."],
  travel: ["Carry stent card and medicines. Arrange antiplatelet continuity at home before travel."],
  comprehensive: ["India can save on PCI hardware, but anatomy and antiplatelet discipline matter more than price."],
});

add("heart-valve-replacement-surgery-india", {
  conditionHeading: "What heart valve repair or replacement involves",
  condition: [
    "Diseased valves may be repaired or replaced when stenosis or regurgitation causes symptoms or heart strain. Mechanical valves need lifelong anticoagulation; bioprosthetic valves have limited longevity.",
    "Approach may be sternotomy, minimally invasive surgery, or transcatheter therapy (TAVR) for selected aortic stenosis.",
    "Send echo, CT when relevant, and anticoagulation history before travel.",
  ],
  who: ["Candidates have guideline indications for intervention. Frailty and prior sternotomy influence surgical vs transcatheter choice."],
  whoBullets: ["Recent echo", "Dental clearance plan", "Mechanical vs tissue valve counselling", "Attendant recommended"],
  process: ["Remote review leads to valve type discussion. Postoperative ICU, possible pacing wires, and INR education for mechanical valves."],
  risks: ["Bleeding, stroke, endocarditis, heart block, valve thrombosis, reoperation over years."],
  riskBullets: ["Stroke", "Infection", "Pacemaker need", "Valve dysfunction"],
  recovery: ["Hospital stay often longer than PCI. Fit-to-fly depends on wounds, rhythm, and anticoagulation stability."],
  itemisation: ["Ask valve brands included and ICU night limits. Separate TAVR device costs if applicable."],
  travel: ["Plan INR checks before flying on warfarin. Carry valve identification cards."],
  comprehensive: ["Valve surgery in India can be cost-effective at high-volume centres when prosthesis choice is settled pre-travel."],
});

add("pacemaker-implantation-india", {
  conditionHeading: "What pacemaker implantation involves",
  condition: [
    "A pacemaker treats symptomatic bradycardia or conduction block by delivering timed electrical impulses to the heart. Single-, dual-, or biventricular devices exist depending on indication.",
    "MRI-conditional devices and lead types should be discussed if future imaging is likely. Remote monitoring may be offered post-implant.",
  ],
  who: ["Candidates have documented bradycardia, syncope, or heart block needing pacing after specialist review."],
  whoBullets: ["Holter/EP studies available", "Infection risk addressed", "Arm activity restrictions understood"],
  process: ["Day-case or overnight stay typical. Device checks and wound care instructions before travel."],
  risks: ["Bleeding, pneumothorax, lead dislodgement, infection, device malfunction."],
  riskBullets: ["Pocket infection", "Lead problems", "Pneumothorax", "Haematoma"],
  recovery: ["Arm restrictions for 1–2 weeks. Device interrogation scheduled before long flights."],
  itemisation: ["Confirm device model, generator warranty, and follow-up interrogation visits included."],
  travel: ["Carry pacemaker ID card through airport security. Avoid heavy lifting on the implant side early on."],
  comprehensive: ["Pacemaker packages in India can be economical when device tier and follow-up checks are spelled out in writing."],
});

add("tavr-india", {
  conditionHeading: "What TAVR (transcatheter aortic valve replacement) involves",
  condition: [
    "TAVR replaces a narrowed aortic valve via catheters, usually through the femoral artery, avoiding open chest surgery in selected high-risk or intermediate-risk patients.",
    "Patient selection uses echo, CT sizing, and frailty assessment. Concomitant coronary disease may need staged PCI.",
  ],
  who: ["Typically older patients with severe symptomatic aortic stenosis and anatomy suitable for transfemoral access."],
  whoBullets: ["CT aortic annulus sizing", "Coronary angiography reviewed", "Vascular access assessment"],
  process: ["Multidisciplinary heart team review. Short ICU stay then ward monitoring for conduction block needing pacemaker."],
  risks: ["Vascular injury, stroke, paravalvular leak, heart block, kidney injury."],
  riskBullets: ["Stroke", "Pacemaker need", "Vascular complications", "Paravalvular leak"],
  recovery: ["Often faster mobilisation than open surgery; still requires structured monitoring before flying."],
  itemisation: ["TAVR valve device cost dominates — confirm brand, size, and access route fees separately."],
  travel: ["Plan ECG follow-up at home for new conduction disease. Carry device documentation."],
  comprehensive: ["TAVR in India can shorten recovery versus open valve surgery when anatomy and heart-team criteria are met."],
});

// --- ORTHO ---
add("total-knee-replacement-surgery-india", {
  conditionHeading: "What total knee replacement involves",
  condition: [
    "Total knee replacement resurfaces arthritic joint surfaces with metal and plastic implants. Partial replacement may suit selected single-compartment disease.",
    "Surgery follows failed physiotherapy, injections, and activity modification when imaging matches symptoms.",
    "Confirm implant brand, surgeon volume, and infection protocols before flying.",
  ],
  who: ["Candidates have end-stage knee arthritis limiting walking and sleep. Diabetes and dental infections affect timing."],
  whoBullets: ["Weight-bearing X-rays", "Medical optimisation", "Physio commitment", "Realistic activity expectations"],
  process: ["Remote X-ray review, surgery, early walking with support, DVT prevention, inpatient physio."],
  risks: ["Infection, clots, stiffness, implant wear, nerve injury."],
  riskBullets: ["Periprosthetic infection", "DVT/PE", "Stiffness", "Loosening over years"],
  recovery: ["Swelling persists weeks. Do not fly long-haul without clearance — clot risk and flexion goals matter."],
  itemisation: ["Named implant brand, navigation/robotics fees, physio sessions, and walker provision."],
  travel: ["Budget 10–14 days in-country for many single-knee pathways with hotel rehab."],
  comprehensive: ["Prioritise infection control and implant transparency over the lowest online quote."],
});

add("hip-replacement-surgery-india", {
  conditionHeading: "What hip replacement involves",
  condition: [
    "Total hip replacement replaces the damaged ball-and-socket joint for osteoarthritis, avascular necrosis, or selected fractures.",
    "Approach and bearing surfaces vary. Send prior operative notes if revision is planned.",
  ],
  who: ["Candidates have hip pain limiting daily life with matching imaging."],
  whoBullets: ["Pelvis/hip X-rays", "Infection risk addressed", "Home mobility plan", "Attendant helpful"],
  process: ["Pre-op assessment, surgery, early mobilisation, approach-specific dislocation precautions."],
  risks: ["Dislocation, infection, clots, leg-length discrepancy, fracture."],
  riskBullets: ["Dislocation", "Infection", "DVT/PE", "Leg-length difference"],
  recovery: ["Many walk with support within a day. Return flights often after ~2 weeks if progress is good."],
  itemisation: ["Implant brand/bearing, cement use, navigation fees, physio inclusions."],
  travel: ["Avoid lifting heavy luggage on return until cleared."],
  comprehensive: ["Hip replacement savings in India matter only with transparent implants and clot prevention."],
});

add("spine-surgery-india", {
  conditionHeading: "What spine surgery (discectomy / fusion) involves",
  condition: [
    "Spine surgery ranges from microdiscectomy for disc herniation to fusion for instability or deformity. Imaging must correlate with symptoms — not every MRI finding needs surgery.",
    "Minimally invasive and open techniques differ in recovery. Share MRI, prior injections, and neurology notes.",
  ],
  who: ["Candidates have radiculopathy or myelopathy with matching imaging after failed conservative care, or structural instability."],
  whoBullets: ["MRI with clinical correlation", "Neurology status documented", "Smoking cessation plan", "Fusion vs discectomy understood"],
  process: ["Remote MRI review, surgery, early mobilisation per surgeon protocol, physio and wound care."],
  risks: ["Bleeding, infection, CSF leak, nerve injury, non-union (fusion), adjacent segment disease."],
  riskBullets: ["Nerve deficit", "Infection", "CSF leak", "Hardware failure", "Persistent pain"],
  recovery: ["Fusion patients need longer rehab than simple discectomy. Sitting tolerance affects flight timing."],
  itemisation: ["Clarify implant/cage brands, neuromonitoring, ICU backup, and physio sessions."],
  travel: ["Bring lumbar support for flights once cleared. Avoid bending/lifting per surgeon instructions."],
  comprehensive: ["Spine surgery tourism fails when MRI findings alone drive travel — insist on clinical correlation."],
});

add("shoulder-replacement-surgery-india", {
  conditionHeading: "What shoulder replacement involves",
  condition: [
    "Shoulder arthroplasty replaces damaged joint surfaces for advanced arthritis or selected fractures. Reverse geometry designs help rotator cuff deficiency.",
    "Physio and realistic expectations about overhead activity are central to satisfaction.",
  ],
  who: ["Candidates have end-stage shoulder arthritis with failed injections and therapy."],
  whoBullets: ["Shoulder X-ray/CT", "Rotator cuff status known", "Physio plan after surgery"],
  process: ["Surgery, sling immobilisation phase, graduated physio — timeline varies by implant type."],
  risks: ["Infection, instability, nerve injury, component loosening."],
  riskBullets: ["Instability", "Infection", "Stiffness", "Component wear"],
  recovery: ["Arm activity restrictions for weeks. Return to sport takes months under guidance."],
  itemisation: ["Implant type (anatomic vs reverse), physio sessions, sling/brace provision."],
  travel: ["Attendant helpful for dressing and transfers early on."],
  comprehensive: ["Shoulder replacement in India works when rehab expectations and implant choice are agreed upfront."],
});

add("acl-reconstruction-surgery-india", {
  conditionHeading: "What ACL reconstruction involves",
  condition: [
    "ACL reconstruction replaces a torn anterior cruciate ligament with graft tissue (often hamstring or patellar tendon) to restore knee stability for active patients.",
    "Not every ACL tear needs immediate surgery — some patients cope with physiotherapy. Timing affects swelling and range before reconstruction.",
  ],
  who: ["Active patients with instability after ACL tear who fail conservative rehab and want return to pivoting sports."],
  whoBullets: ["MRI confirming ACL tear", "Physio prehab when possible", "Graft choice discussed", "Months of rehab commitment"],
  process: ["Arthroscopic day-case or short stay, brace and crutches, structured physio protocol for months."],
  risks: ["Graft failure, stiffness, infection, clot, kneecap pain (patellar graft)."],
  riskBullets: ["Graft re-rupture", "Stiffness", "Infection", "Persistent instability"],
  recovery: ["Return to sport takes many months. Early flights possible for desk workers if cleared; sport return is not immediate."],
  itemisation: ["Graft type, fixation devices, brace, and number of physio sessions included."],
  travel: ["Do not plan competitive sport timelines before surgeon clearance."],
  comprehensive: ["ACL reconstruction in India is cost-effective when graft choice and rehab access at home are planned."],
});

add("bilateral-knee-replacement-india", {
  conditionHeading: "What bilateral knee replacement involves",
  condition: [
    "Both knees may be replaced in one admission (simultaneous) or staged weeks apart depending on age, comorbidities, and surgeon preference.",
    "Simultaneous bilateral TKR increases medical load but one travel episode; staged may be safer for some patients.",
  ],
  who: ["Patients with bilateral end-stage arthritis fit for longer rehab and higher perioperative demand."],
  whoBullets: ["Medical fitness for longer surgery", "Attendant strongly recommended", "Home stair plan", "Extended stay budget"],
  process: ["Intensive physio before discharge, DVT prophylaxis, often longer hospital stay than single knee."],
  risks: ["Higher blood loss and rehab demand than single knee; infection and clot risks remain."],
  riskBullets: ["Transfusion need", "Prolonged rehab", "Infection", "DVT/PE"],
  recovery: ["Expect longer in-country stay and slower independence than single-knee patients."],
  itemisation: ["Price simultaneous vs staged pathways separately. Confirm implant brands for both sides."],
  travel: ["Budget extra recovery weeks and attendant support before flying home."],
  comprehensive: ["Bilateral knee packages should be judged on safety of one-stage vs two-stage plans, not headline price alone."],
});

// --- ONCOLOGY / NEURO / TRANSPLANT ---
add("chemotherapy-cost-india", {
  conditionHeading: "What chemotherapy treatment involves",
  condition: [
    "Chemotherapy uses drugs to kill or control cancer cells, given intravenously or orally in cycles. Regimens depend on cancer type, stage, biomarkers, and prior treatment.",
    "India offers day-care infusion units at accredited cancer centres with lower per-cycle costs than many Western self-pay settings.",
    "Bring full pathology, receptor status, prior regimens, and imaging so medical oncology can propose the correct protocol — not a generic “chemo package”.",
  ],
  who: ["Patients with confirmed malignancy needing systemic therapy, fit enough for planned cycles, with clear staging workup."],
  whoBullets: ["Histopathology and biomarkers", "Staging scans", "Blood counts before each cycle", "Plan for cycles spanning weeks in India or split travel"],
  process: [
    "Tumour board or oncologist review → cycle scheduling → pre-chemo labs → infusion → anti-nausea/support meds → follow-up scans as planned.",
    "International patients may stay for several cycles or return between cycles depending on visa and finances.",
  ],
  risks: ["Infection during neutropenia, anaemia, bleeding, nausea, organ toxicity, allergic reactions."],
  riskBullets: ["Febrile neutropenia", "Anaemia", "Neuropathy", "Kidney/liver effects"],
  recovery: ["Cycle-dependent fatigue. Avoid crowded travel when counts are low per oncologist advice."],
  itemisation: ["Specify drug names, doses, cycle count, growth factor support, and imaging inclusions."],
  travel: ["Build a calendar around cycle spacing and lab checks. Attendant support helps during tough weeks."],
  comprehensive: ["Chemo tourism works when the exact protocol matches guideline care — not when only a cheap infusion is advertised."],
});

add("radiation-therapy-india", {
  conditionHeading: "What radiation therapy involves",
  condition: [
    "Radiation uses focused high-energy beams to destroy cancer cells, often daily outpatient sessions over weeks. Techniques include IMRT, VMAT, and SBRT depending on tumour site.",
    "Simulation, planning, and quality assurance are as important as the daily treatment — choose centres with modern linacs and physics teams.",
  ],
  who: ["Patients with radiotherapy indications confirmed by oncology team after staging and multidisciplinary review."],
  whoBullets: ["Simulation CT completed", "Prior chemo/surgery history documented", "Lodging near centre for daily visits"],
  process: ["Simulation → planning → daily fractions → weekly reviews → follow-up imaging as planned."],
  risks: ["Skin reactions, fatigue, site-specific side effects (e.g. bowel, bladder, swallowing)."],
  riskBullets: ["Fatigue", "Skin breakdown", "Organ-specific toxicity"],
  recovery: ["Fatigue accumulates over the course. Plan rest days and transport to the centre each day."],
  itemisation: ["Confirm technique (IMRT/VMAT), number of fractions, imaging, and on-treatment reviews included."],
  travel: ["Stay near the hospital for the full fraction schedule — splitting mid-course is unsafe."],
  comprehensive: ["Radiation in India saves when technique and fraction count are transparent, not when only “per session” pricing is quoted."],
});

add("brain-tumor-surgery-india", {
  conditionHeading: "What brain tumor surgery involves",
  condition: [
    "Surgery aims to remove or debulk brain tumours when safe, relieve pressure, and obtain tissue diagnosis. Awake craniotomy, navigation, and ICU neuro monitoring are used in selected cases.",
    "Not all tumours are surgically curable — some need biopsy only, radiosurgery, or chemoradiation. MRI with contrast and neurology status guide planning.",
  ],
  who: ["Patients with resectable or debulkable lesions causing symptoms or diagnostic need, fit for neuroanaesthesia and ICU care."],
  whoBullets: ["MRI with contrast", "Neurology exam documented", "Anticonvulsant plan", "Attendant for early recovery"],
  process: ["Neurosurgical review → pre-op MRI → craniotomy → ICU → ward → rehab/physio as needed → histopathology drives next steps."],
  risks: ["Bleeding, infection, seizures, neurological deficit, CSF leak, ICU complications."],
  riskBullets: ["Weakness or speech change", "Seizures", "Infection", "CSF leak"],
  recovery: ["ICU 1–3 days typical; longer if deficit. Rehab may continue at home after discharge summaries are shared."],
  itemisation: ["Navigation, ICU nights, histopathology, and rehab sessions should be listed."],
  travel: ["Do not fly until neurosurgical team clears — risk of brain swelling and clots."],
  comprehensive: ["Brain tumour surgery in India requires high-volume neuro centres — not general medical tourism brokers."],
});

add("kidney-transplant-india", {
  conditionHeading: "What kidney transplant involves",
  condition: [
    "Kidney transplant replaces failed kidney function with a donor kidney from a living or deceased donor programme per local law and ethics. Recipients need lifelong immunosuppression.",
    "Living donor transplants require legal compatibility, donor evaluation, and clear documentation. International patients must understand Indian transplant regulations and documentation timelines.",
  ],
  who: ["End-stage renal disease patients with suitable donor workup (where legally permitted) and acceptable cardiovascular fitness."],
  whoBullets: ["Dialysis records", "Donor evaluation status", "HLA/crossmatch planning", "Financial plan for lifelong medicines"],
  process: ["Multidisciplinary clearance → surgery → ICU/ward → immunosuppression teaching → outpatient monitoring for weeks."],
  risks: ["Rejection, infection, surgical bleeding, ureteric complications, side effects of immunosuppressants."],
  riskBullets: ["Acute rejection", "Infection", "Bleeding", "Delayed graft function"],
  recovery: ["Hospital stay often 1–3 weeks; months of labs and dose adjustments follow."],
  itemisation: ["Separate donor workup, induction agents, ICU, and medicine costs for first months."],
  travel: ["Plan extended stay for early rejection monitoring before returning home with nephrology follow-up arranged."],
  comprehensive: ["Kidney transplant tourism must comply with law and ethics — verify documentation pathways before paying deposits."],
});

add("liver-transplant-india", {
  conditionHeading: "What liver transplant involves",
  condition: [
    "Liver transplant replaces a failing liver with a donor graft in end-stage liver disease or selected cancers/ acute failure per centre criteria.",
    "Living donor liver transplant is common in India when legal and medical criteria are met. Complexity and ICU needs are high.",
  ],
  who: ["Patients meeting transplant listing criteria with donor availability and acceptable cardiopulmonary status."],
  whoBullets: ["MELD/scoring workup", "Donor evaluation", "ICU-capable centre chosen", "Long stay budget"],
  process: ["Extensive pre-transplant workup → surgery → prolonged ICU → ward → immunosuppression and infection prophylaxis."],
  risks: ["Bleeding, infection, rejection, bile duct complications, vascular thrombosis."],
  riskBullets: ["Biliary leak", "Rejection", "Sepsis", "Vascular complications"],
  recovery: ["Months of close monitoring; travel home only when transplant team agrees."],
  itemisation: ["Donor surgery fees, ICU days, immunosuppression, and readmission policies must be explicit."],
  travel: ["Attendant essential. Plan housing near transplant centre for weeks to months."],
  comprehensive: ["Liver transplant is among the highest-acuity medical tourism pathways — centre volume and ICU matter more than savings."],
});

add("bone-marrow-transplant-india", {
  conditionHeading: "What bone marrow / stem cell transplant involves",
  condition: [
    "BMT replaces diseased marrow with healthy stem cells after high-dose chemo/radiation (autologous) or donor cells (allogeneic) for blood cancers and selected disorders.",
    "Allogeneic transplants need matched donors, prolonged isolation, and graft-versus-host monitoring.",
  ],
  who: ["Patients with indications confirmed by haemato-oncology after full staging and donor search where needed."],
  whoBullets: ["Diagnosis and cytogenetics", "Donor match status", "Infection screening", "Months-long stay plan"],
  process: ["Conditioning chemotherapy → stem cell infusion → isolation → engraftment monitoring → outpatient follow-up for months."],
  risks: ["Infection during neutropenia, GVHD (allogeneic), organ toxicity, graft failure."],
  riskBullets: ["Sepsis", "GVHD", "Mucositis", "Graft failure"],
  recovery: ["Weeks in hospital isolation; months of labs and prophylaxis after discharge."],
  itemisation: ["Conditioning regimen, cell processing, isolation room days, and donor search fees listed separately."],
  travel: ["Do not plan return until haematology clears — neutropenic travel is dangerous."],
  comprehensive: ["BMT in India demands accredited transplant units with blood bank and isolation infrastructure."],
});

add("robotic-prostatectomy-cost-india", {
  conditionHeading: "What robotic prostatectomy involves",
  condition: [
    "Robotic-assisted radical prostatectomy removes the prostate for localised prostate cancer using minimally invasive instruments with enhanced precision.",
    "Not every prostate cancer needs surgery — active surveillance or radiation may apply. PSA, MRI, and biopsy grade group guide decisions.",
  ],
  who: ["Fit patients with localised prostate cancer suitable for radical prostatectomy after urology/oncology review."],
  whoBullets: ["Biopsy grade and staging", "PSA trend", "Urinary function baseline", "Pelvic floor rehab plan"],
  process: ["Pre-op assessment → robotic surgery → catheter period → pathology → PSA follow-up plan."],
  risks: ["Bleeding, infection, urinary incontinence, erectile dysfunction, positive margins."],
  riskBullets: ["Incontinence", "Erectile dysfunction", "Positive margins", "Clot risk"],
  recovery: ["Catheter usually days to ~2 weeks. Pelvic floor physio helps continence recovery over months."],
  itemisation: ["Robot fees, hospital nights, catheter supplies, and pathology included?" ],
  travel: ["Confirm catheter management and flight clearance before booking return."],
  comprehensive: ["Robotic prostatectomy savings in India are meaningful when oncologic outcomes and continence counselling are centre-led."],
});

// --- DENTAL / EYE / ENT / COSMETIC / BARIATRIC ---
add("dental-implants-cost-india", {
  conditionHeading: "What dental implant treatment involves",
  condition: [
    "Dental implants replace missing tooth roots with titanium fixtures that support crowns or bridges after osseointegration. Bone grafting or sinus lift may be needed if volume is insufficient.",
    "Treatment may span two trips: surgical placement then crown after healing months later.",
  ],
  who: ["Patients with missing teeth, adequate bone (or graft plan), and controlled gum disease."],
  whoBullets: ["Dental X-ray/CBCT", "Gum health addressed", "Realistic timeline for two-visit plans"],
  process: ["Imaging → implant placement → healing → abutment and crown. Temporary teeth may be offered case by case."],
  risks: ["Implant failure, infection, nerve injury (lower jaw), sinus issues (upper jaw)."],
  riskBullets: ["Peri-implantitis", "Failure to integrate", "Nerve numbness"],
  recovery: ["Soft diet initially; osseointegration takes months before final loading."],
  itemisation: ["Implant brand, crown material, grafting, and sedation fees itemised per tooth/site."],
  travel: ["Plan return visit for crowns or confirm temporary solution if single-trip marketing is offered."],
  comprehensive: ["Dental implant tourism works with CBCT planning and brand transparency — not mystery “per tooth” ads."],
});

add("lasik-eye-surgery-cost-india", {
  conditionHeading: "What LASIK eye surgery involves",
  condition: [
    "LASIK reshapes the cornea with laser to reduce dependence on glasses for selected refractive errors. Alternatives include PRK/SMILE for some corneas.",
    "Stable prescription, adequate corneal thickness, and dry-eye management matter for safety.",
  ],
  who: ["Adults with stable myopia/hyperopia/astigmatism meeting corneal thickness and topography criteria."],
  whoBullets: ["Stable Rx 12+ months", "Topography/pachymetry done", "Dry eye treated"],
  process: ["Assessment → laser procedure (minutes) → drops → next-day check → follow-up before flying."],
  risks: ["Dry eye, glare/halos, under/over-correction, rare ectasia with poor selection."],
  riskBullets: ["Dry eye", "Glare", "Regression", "Infection (rare)"],
  recovery: ["Most desk work resumes in 1–3 days; avoid rubbing eyes and swimming early."],
  itemisation: ["Technique (LASIK vs PRK), enhancement policy, and medications included."],
  travel: ["Attend post-op checks before flying. Bring sunglasses for light sensitivity."],
  comprehensive: ["LASIK in India is low-cost when pre-op screening is thorough — reject centres that skip topography."],
});

add("cataract-surgery-india", {
  conditionHeading: "What cataract surgery involves",
  condition: [
    "Phacoemulsification removes the cloudy lens and inserts an intraocular lens (IOL). Premium toric or multifocal IOLs cost more but reduce glasses dependence in selected patients.",
    "Often day-care for each eye; second eye may be staged days apart.",
  ],
  who: ["Patients with visually significant cataract affecting daily life after optometry/ophthalmology confirmation."],
  whoBullets: ["Biometry done", "IOL type chosen", "Blood sugar controlled if diabetic"],
  process: ["Topical anaesthesia common → lens removal → IOL → drops → next-day review."],
  risks: ["Infection (endophthalmitis), retinal detachment, macular oedema, refractive surprise."],
  riskBullets: ["Infection", "Retinal detachment", "Swelling", "Glare with multifocal IOLs"],
  recovery: ["Vision improves over days to weeks; avoid heavy lifting and eye rubbing early."],
  itemisation: ["IOL model (monofocal vs toric vs multifocal) and second-eye pricing."],
  travel: ["Short stay possible for single eye; plan reviews before flying."],
  comprehensive: ["Cataract surgery in India is high volume — choose IOL tier and infection protocols explicitly."],
});

add("cochlear-implant-cost-india", {
  conditionHeading: "What cochlear implant surgery involves",
  condition: [
    "A cochlear implant bypasses damaged inner ear cells to stimulate the auditory nerve, used for severe sensorineural hearing loss when hearing aids are insufficient.",
    "Surgery is only the start — months of auditory rehabilitation and device mapping are essential.",
  ],
  who: ["Children or adults meeting audiology and imaging criteria for implantation after specialist assessment."],
  whoBullets: ["Audiology testing", "CT/MRI cochlea", "Realistic rehab commitment", "Speech therapy plan"],
  process: ["Surgery → device activation weeks later → mapping sessions → long-term rehab."],
  risks: ["Infection, device failure, facial nerve injury (rare), meningitis risk mitigated by vaccination protocols."],
  riskBullets: ["Infection", "Device malfunction", "Balance symptoms", "Poor outcomes without rehab"],
  recovery: ["Short hospital stay; hearing “sound quality” develops over months with mapping."],
  itemisation: ["Implant brand/processor, surgery, activation, and first year mapping sessions."],
  travel: ["Plan extended stay or return visits for mapping; rehab cannot be skipped."],
  comprehensive: ["Cochlear implant packages must include mapping and rehab — surgery alone is insufficient."],
});

add("bariatric-weight-loss-surgery-india", {
  conditionHeading: "What bariatric / weight loss surgery involves",
  condition: [
    "Bariatric procedures (sleeve gastrectomy, gastric bypass, others) reduce stomach capacity and/or absorption to treat obesity and related diseases when lifestyle and medical therapy fail.",
    "Multidisciplinary assessment — nutrition, psychology, anaesthesia — is standard before surgery.",
  ],
  who: ["Patients meeting BMI and comorbidity criteria with commitment to lifelong diet, supplements, and follow-up."],
  whoBullets: ["BMI and comorbidity documentation", "Psych/nutrition clearance", "Vitamin plan understood"],
  process: ["Pre-op diet → laparoscopic surgery → staged diet progression → long-term monitoring."],
  risks: ["Bleeding, leak, clot, deficiency, reflux, weight regain if lifestyle slips."],
  riskBullets: ["Anastomotic leak", "Clots", "Nutritional deficiency", "GERD"],
  recovery: ["Hospital 2–4 days typical; pureed diet progression over weeks."],
  itemisation: ["Procedure type, leak test, ICU backup, and follow-up nutrition visits."],
  travel: ["Ensure home clinician can monitor vitamins and weight long term."],
  comprehensive: ["Bariatric surgery in India saves when lifelong follow-up is planned — not for quick holiday weight loss."],
});

add("hair-transplant-cost-india", {
  conditionHeading: "What hair transplant surgery involves",
  condition: [
    "FUE/FUT transplants move follicles from donor scalp to thinning areas. Graft count and hair calibre determine cosmetic density.",
    "Medical causes of hair loss (thyroid, iron, alopecia areata) should be excluded before surgery.",
  ],
  who: ["Patients with stable pattern hair loss, adequate donor density, and realistic density expectations."],
  whoBullets: ["Donor area assessment", "Medical workup if shedding active", "No smoking around procedure"],
  process: ["Design hairline → harvest grafts → implant → post-op washing instructions."],
  risks: ["Poor growth, scarring, infection, unnatural hairline if poorly designed."],
  riskBullets: ["Poor yield", "Visible scarring", "Infection"],
  recovery: ["Scabbing 7–10 days; final density over 9–12 months."],
  itemisation: ["Graft count cap, FUE vs FUT, PRP add-ons, and touch-up policy."],
  travel: ["Avoid helmets/hats rubbing grafts early. Follow washing protocol exactly."],
  comprehensive: ["Hair transplant tourism fails with inflated graft counts — verify photos and surgeon involvement."],
});

add("liposuction-cost-india", {
  conditionHeading: "What liposuction involves",
  condition: [
    "Liposuction removes localised fat deposits via cannulas; it is body contouring, not weight-loss surgery. Skin elasticity determines smooth results.",
    "Lidocaine fluid limits and total aspirate volumes must respect safety guidelines.",
  ],
  who: ["Near-target-weight patients with localised fat resistant to diet/exercise and good skin tone."],
  whoBullets: ["BMI within safe limits", "No active clotting disorders", "Compression garment plan"],
  process: ["Marking → tumescent lipo → compression garments → lymphatic massage sometimes advised."],
  risks: ["Contour irregularities, seroma, infection, clot, skin injury."],
  riskBullets: ["Irregular contours", "Seroma", "DVT", "Skin necrosis (rare)"],
  recovery: ["Swelling weeks; garments for weeks; avoid strenuous exercise early."],
  itemisation: ["Areas treated, anaesthesia type, garment, and massage sessions."],
  travel: ["Wait for flight clearance if large volume removed — fluid shifts and clot risk."],
  comprehensive: ["Liposuction in India is safe at accredited centres that respect volume limits — avoid high-volume “mega lipo” tourism."],
});

add("rhinoplasty-cost-india", {
  conditionHeading: "What rhinoplasty (nose job) involves",
  condition: [
    "Rhinoplasty reshapes bone and cartilage for breathing improvement, trauma correction, or cosmetic refinement. Open vs closed techniques differ in access and swelling.",
    "Revision rhinoplasty is more complex — send prior operative notes and photos.",
  ],
  who: ["Healthy patients with clear aesthetic or functional goals after surgeon consultation."],
  whoBullets: ["Facial photos standardized", "Nasal airway issues documented", "Smoking cessation"],
  process: ["Surgery → splint → swelling management → gradual result over months."],
  risks: ["Bleeding, infection, asymmetry, breathing change, need for revision."],
  riskBullets: ["Asymmetry", "Persistent swelling", "Septal perforation (rare)", "Revision need"],
  recovery: ["Splint ~1 week; swelling months; avoid glasses resting on nose early."],
  itemisation: ["Primary vs revision pricing, graft sources, and follow-up visits."],
  travel: ["Some surgeons advise delaying flights until splint removal and early healing checks."],
  comprehensive: ["Rhinoplasty tourism needs photographic planning and airway assessment — not same-day quotes only."],
});

add("breast-augmentation-reduction-india", {
  conditionHeading: "What breast augmentation or reduction involves",
  condition: [
    "Augmentation uses implants or fat transfer to increase volume; reduction removes tissue to relieve symptoms. Lift procedures address ptosis.",
    "Implant size/profile and incision choice should match chest anatomy and lifestyle.",
  ],
  who: ["Healthy patients with realistic goals; reduction candidates often have neck/back symptoms documented."],
  whoBullets: ["Mammogram if age-appropriate", "Implant size counselling", "Scar placement understood"],
  process: ["Surgery → drains sometimes → support bra → activity limits → implant checks long term (augmentation)."],
  risks: ["Bleeding, infection, capsular contracture, implant rupture, altered sensation."],
  riskBullets: ["Capsular contracture", "Infection", "Asymmetry", "Nipple sensation change"],
  recovery: ["Avoid heavy lifting weeks; return to desk work sooner if comfortable."],
  itemisation: ["Implant brand/warranty, lift add-ons, and overnight stay needs."],
  travel: ["Carry implant ID cards for augmentation. Plan follow-up if drains used."],
  comprehensive: ["Breast surgery in India should specify implant tier and revision policies up front."],
});

const merged = { ...depth, ...NEW_DEPTH };
fs.writeFileSync(depthPath, JSON.stringify(merged, null, 2) + "\n");

console.log("Added depth for", Object.keys(NEW_DEPTH).length, "procedures");
console.log("Total depth entries:", Object.keys(merged).length);
console.log("New slugs:", Object.keys(NEW_DEPTH).join(", "));
