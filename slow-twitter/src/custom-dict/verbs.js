let verbs = [
  "Accelerate",
  "Accommodate",
  "Accomplish",
  "Accumulate",
  "Achieve",
  "Acquire",
  "Act",
  "Activate",
  "Adapt",
  "Add",
  "Address",
  "Adjust",
  "Administer",
  "Advertise",
  "Advise",
  "Advocate",
  "Aid",
  "Aide",
  "Align",
  "Allocate",
  "Amend",
  "Analyze",
  "Answer",
  "Anticipate",
  "Apply",
  "Appoint",
  "Appraise",
  "Approve",
  "Arbitrate",
  "Arrange",
  "Articulate",
  "Ascertain",
  "Assemble",
  "Assess",
  "Assign",
  "Assist",
  "Assume",
  "Attain",
  "Attend",
  "Attract",
  "Audit",
  "Augment",
  "Author",
  "Authorize",
  "Automate",
  "Avert",
  "Award",
  "Bargain",
  "Begin",
  "Bolster",
  "Boost",
  "Bought",
  "Brief",
  "Broaden",
  "Budget",
  "Build",
  "Built",
  "Calculate",
  "Calibrate",
  "Canvass",
  "Capture",
  "Care",
  "Catalog",
  "Catalogue",
  "Categorize",
  "Cater",
  "Cause",
  "Centralize",
  "Chair",
  "Charge",
  "Chart",
  "Check",
  "Check in",
  "Check out",
  "Clarify",
  "Classify",
  "Co-operate",
  "Coach",
  "Code",
  "Collaborate",
  "Collate",
  "Collect",
  "Combine",
  "Comfort",
  "Commence",
  "Communicate",
  "Compare",
  "Compile",
  "Complete",
  "Compose",
  "Compute",
  "Conceive",
  "Conceptualize",
  "Conciliate",
  "Conclude",
  "Condense",
  "Conduct",
  "Confer",
  "Confirm",
  "Connect",
  "Conserve",
  "Consider",
  "Consolidate",
  "Construct",
  "Consult",
  "Contact",
  "Contract",
  "Contribute",
  "Control",
  "Convert",
  "Convey",
  "Convince",
  "Cooperate",
  "Coordinate",
  "Copy",
  "Correct",
  "Correlate",
  "Correspond",
  "Counsel",
  "Create",
  "Critique",
  "Cultivate",
  "Customize",
  "Dealt with",
  "Debate",
  "Debug",
  "Decide",
  "Decrease",
  "Dedicate",
  "Deduce",
  "Defend",
  "Defer",
  "Define",
  "Delegate",
  "Deliver",
  "Demonstrate",
  "Depict",
  "Depreciated",
  "Derive",
  "Describe",
  "Design",
  "Detail",
  "Detect",
  "Determine",
  "Develop",
  "Devise",
  "Devote",
  "Diagnose",
  "Diagram",
  "Differentiate",
  "Direct",
  "Discharge",
  "Disclose",
  "Discover",
  "Discriminate",
  "Discuss",
  "Dispatch",
  "Display",
  "Dissect",
  "Disseminate",
  "Distinguish",
  "Distribute",
  "Diversify",
  "Document",
  "Draft",
  "Draw",
  "Drew",
  "Earn",
  "Edit",
  "Educate",
  "Effect",
  "Elect",
  "Elicit",
  "Eliminate",
  "Emphasize",
  "Employ",
  "Enable",
  "Encourage",
  "Enforce",
  "Engineer",
  "Enhance",
  "Enlarge",
  "Enlighten",
  "Enlist",
  "Enrich",
  "Ensure",
  "Enter",
  "Entertain",
  "Enumerate",
  "Equip",
  "Establish",
  "Estimate",
  "Evaluate",
  "Examine",
  "Exchange",
  "Execute",
  "Exercise",
  "Exhibit",
  "Expand",
  "Expedite",
  "Experiment",
  "Explain",
  "Explore",
  "Express",
  "Extend",
  "Extract",
  "Extrapolate",
  "Fabricate",
  "Facilitate",
  "Familiarize",
  "Fashion",
  "File",
  "Filter",
  "Finalize",
  "Fine-tune",
  "Fix",
  "Focus",
  "Forecast",
  "Formulate",
  "Fortify",
  "Forward",
  "Foster",
  "Found",
  "Frame",
  "Fund",
  "Furnish",
  "Further",
  "Gather",
  "Gauge",
  "Generate",
  "Govern",
  "Grade",
  "Grant",
  "Greet",
  "Guide",
  "Handle",
  "Head",
  "Help",
  "Highlight",
  "Hire",
  "Host",
  "Identify",
  "Illustrate",
  "Impart",
  "Implement",
  "Import",
  "Improve",
  "Improvise",
  "Incorporate",
  "Increase",
  "Index",
  "Individualize",
  "Influence",
  "Inform",
  "Initiate",
  "Innovate",
  "Inspect",
  "Inspire",
  "Install",
  "Institute",
  "Instruct",
  "Insure",
  "Integrate",
  "Interact",
  "Interface",
  "Interpret",
  "Intervene",
  "Interview",
  "Introduce",
  "Invent",
  "Inventory",
  "Investigate",
  "Involve",
  "Join",
  "Judge",
  "Justify",
  "Label",
  "Launch",
  "Lead",
  "Learn",
  "Lecture",
  "License",
  "Lighten",
  "Liquidate",
  "List",
  "Listen",
  "Litigate",
  "Lobby",
  "Localize",
  "Locate",
  "Log",
  "Maintain",
  "Manage",
  "Manufacture",
  "Map",
  "Market",
  "Master",
  "Maximize",
  "Measure",
  "Mechanize",
  "Mediate",
  "Mentor",
  "Merge",
  "Methodize",
  "Minimize",
  "Mobilize",
  "Model",
  "Moderate",
  "Modernize",
  "Modify",
  "Monitor",
  "Motivate",
  "Narrate",
  "Navigate",
  "Negotiate",
  "Notify",
  "Nurse",
  "Nurture",
  "Observe",
  "Obtain",
  "Officiate",
  "Offset",
  "Operate",
  "Orchestrate",
  "Order",
  "Organize",
  "Orient",
  "Orientate",
  "Originate",
  "Outline",
  "Overhaul",
  "Oversaw",
  "Oversee",
  "Package",
  "Participate",
  "Perceive",
  "Perfect",
  "Perform",
  "Persuade",
  "Photograph",
  "Pilot",
  "Pioneer",
  "Plan",
  "Practice",
  "Predict",
  "Prepare",
  "Present",
  "Preserve",
  "Preside",
  "Prevent",
  "Print",
  "Prioritize",
  "Probe",
  "Process",
  "Produce",
  "Program",
  "Project",
  "Promote",
  "Propose",
  "Provide",
  "Publicize",
  "Publish",
  "Purchase",
  "Qualify",
  "Quantify",
  "Quote",
  "Raise",
  "Ran",
  "Rank",
  "Rate",
  "Read",
  "Reason",
  "Recall",
  "Recognize",
  "Recommend",
  "Reconcile",
  "Record",
  "Recreate",
  "Recruit",
  "Rectify",
  "Reduce",
  "Refer",
  "Refine",
  "Register",
  "Regulate",
  "Rehabilitate",
  "Reinforce",
  "Relate",
  "Related",
  "Release",
  "Remodel",
  "Render",
  "Renew",
  "Reorganize",
  "Repair",
  "Replace",
  "Report",
  "Represent",
  "Research",
  "Reserve",
  "Resolve",
  "Respond",
  "Restore",
  "Restrict",
  "Retain",
  "Retrieve",
  "Revamp",
  "Reveal",
  "Review",
  "Revise",
  "Revitalize",
  "Route",
  "Sample",
  "Save",
  "Scan",
  "Schedule",
  "Screen",
  "Script",
  "Scrutinize",
  "Search",
  "Secure",
  "Segment",
  "Select",
  "Serve",
  "Service",
  "Set goals",
  "Set up",
  "Settle",
  "Shape",
  "Share",
  "Show",
  "Simplify",
  "Simulate",
  "Sketch",
  "Sold",
  "Solicit",
  "Solve",
  "Sort",
  "Speak",
  "Spearhead",
  "Specialize",
  "Specify",
  "Spoke",
  "Stage",
  "Standardize",
  "Start",
  "Stimulate",
  "Straighten",
  "Strategize",
  "Streamline",
  "Strengthen",
  "Structure",
  "Study",
  "Submit",
  "Substantiate",
  "Substitute",
  "Suggest",
  "Summarize",
  "Supervise",
  "Supply",
  "Support",
  "Surpass",
  "Survey",
  "Sustain",
  "Symbolize",
  "Synthesize",
  "Systematize",
  "Tabulate",
  "Tail",
  "Target",
  "Taught",
  "Teach",
  "Tend",
  "Terminate",
  "Test",
  "Theorize",
  "Time",
  "Tour",
  "Trace",
  "Track",
  "Trade",
  "Train",
  "Transcribe",
  "Transfer",
  "Transform",
  "Translate",
  "Transmit",
  "Transport",
  "Transpose",
  "Travel",
  "Treat",
  "Triple",
  "Troubleshot",
  "Tutor",
  "Uncover",
  "Undertook",
  "Unify",
  "Unveil",
  "Update",
  "Upgrade",
  "Upheld",
  "Use",
  "Utilize",
  "Validate",
  "Value",
  "Verify",
  "View",
  "Visit",
  "Visualize",
  "Vitalize",
  "Volunteer",
  "Weigh",
  "Widen",
  "Win",
  "Withdraw",
  "Witness",
  "Write",
  "Xerox",
  "Zap",
  "Zip"
];

export default verbs;
