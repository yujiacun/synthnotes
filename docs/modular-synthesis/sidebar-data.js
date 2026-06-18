/* Guide data for the Modular Synthesis notebook.
   Loaded BEFORE the shared sidebar.js, which reads window.SIDEBAR_DATA.
   To add a chapter: drop it into the right stage with status 'done' or 'pending'. */

window.SIDEBAR_DATA = {
    title: "Modular Synthesis",
    stages: [
        {
            title: "Stage 1 — Foundations",
            chapters: [
                { id: "01-introduction",       title: "What Is Modular Synthesis?",                status: "pending" },
                { id: "02-signal-types",       title: "Signal Types: Audio, CV, Gate, Trigger",    status: "pending" },
                { id: "03-voltage-standards",  title: "Voltage Standards (1V/oct, Hz/V)",          status: "pending" },
                { id: "04-patching-basics",    title: "Modules & Patching Basics",                 status: "pending" },
            ]
        },
        {
            title: "Stage 2 — Sound Generation",
            chapters: [
                { id: "05-oscillators",        title: "Oscillators (VCO)",                         status: "pending" },
                { id: "06-waveforms",          title: "Waveforms & Wavetables",                    status: "pending" },
                { id: "07-tuning",             title: "Tuning & Pitch",                            status: "pending" },
                { id: "08-noise",              title: "Noise Sources",                             status: "pending" },
            ]
        },
        {
            title: "Stage 3 — Signal Shaping",
            chapters: [
                { id: "09-filters",            title: "Filters (VCF)",                             status: "pending" },
                { id: "10-envelopes",          title: "Envelopes (ADSR)",                          status: "pending" },
                { id: "11-amplifiers",         title: "Amplifiers (VCA)",                          status: "pending" },
                { id: "12-distortion",         title: "Distortion & Wavefolding",                  status: "pending" },
            ]
        },
        {
            title: "Stage 4 — Modulation",
            chapters: [
                { id: "13-lfos",               title: "LFOs",                                      status: "pending" },
                { id: "14-sample-and-hold",    title: "Sample & Hold",                             status: "pending" },
                { id: "15-modulation-routing", title: "Modulation Routing",                        status: "pending" },
                { id: "16-function-generators",title: "Function Generators",                       status: "pending" },
            ]
        },
        {
            title: "Stage 5 — Sequencing & Performance",
            chapters: [
                { id: "17-step-sequencers",    title: "Step Sequencers",                           status: "pending" },
                { id: "18-clocking",           title: "Clocking & Sync",                           status: "pending" },
                { id: "19-quantizers",         title: "Quantizers",                                status: "pending" },
                { id: "20-performance-patches",title: "Performance Patches",                       status: "pending" },
            ]
        },
    ]
};
