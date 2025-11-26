import React, { useState } from 'react';
import { 
  Users, 
  PenTool, 
  Target, 
  TrendingUp, 
  Briefcase, 
  GitCommit, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Layout,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// --- Brand Colors (Approximation of Lokalise) ---
// Dark Navy: #121A21
// Teal: #00A59A
// Light BG: #F7F9FB
// Text: #1C2D3B

const BRAND = {
  navy: "#121A21",
  teal: "#00A59A",
  tealLight: "#E6F6F5",
  gray: "#F7F9FB",
  slate: "#475569"
};

// --- Data ---

const competencyData = [
  { subject: 'Visual Craft', A: 90, B: 85, C: 50, fullMark: 100 },
  { subject: 'UX Strategy', A: 70, B: 85, C: 80, fullMark: 100 },
  { subject: 'Leadership', A: 40, B: 60, C: 90, fullMark: 100 },
  { subject: 'People Mgmt', A: 10, B: 30, C: 100, fullMark: 100 },
  { subject: 'Operations', A: 20, B: 40, C: 85, fullMark: 100 },
  { subject: 'Business Impact', A: 50, B: 80, C: 80, fullMark: 100 },
];

const timeData = [
  { name: 'Mid (IC2)', Execution: 80, Mentorship: 5, Strategy: 10, Alignment: 5 },
  { name: 'Senior (IC3)', Execution: 65, Mentorship: 10, Strategy: 15, Alignment: 10 },
  { name: 'Lead (IC4)', Execution: 50, Mentorship: 20, Strategy: 15, Alignment: 15 },
  { name: 'Staff (IC4)', Execution: 50, Mentorship: 15, Strategy: 25, Alignment: 10 },
  { name: 'Manager (M2)', Execution: 10, Mentorship: 50, Strategy: 20, Alignment: 20 },
  { name: 'Director (M6)', Execution: 0, Mentorship: 30, Strategy: 40, Alignment: 30 },
];

const roles = [
  {
    title: "Junior Product Designer",
    level: "IC1",
    summary: "Learning the craft and tools. Works on defined tasks with supervision.",
    points: [
      "Mastering Figma and design system basics.",
      "Delivering UI components and basic flows.",
      "Learning to solicit and accept feedback."
    ]
  },
  {
    title: "Product Designer",
    level: "IC2",
    summary: "The engine of the team. Autonomous in execution of features.",
    points: [
      "End-to-end execution of features.",
      "Strong prototyping and interaction design skills.",
      "Collaborates effectively with Eng and PM peers."
    ]
  },
  {
    title: "Senior Product Designer",
    level: "IC3",
    summary: "Problem solver. Handles ambiguity and complex scopes.",
    points: [
      "Defines the 'How' and influences the 'What'.",
      "Mentors juniors and improves team processes.",
      "Connecting dots across different product areas."
    ]
  },
  {
    title: "Lead Product Designer",
    level: "IC4",
    summary: "The 'People Prep' Role. High-level IC with leadership responsibilities.",
    points: [
      "Leads critical initiatives without direct reports.",
      "The bridge between strategy and execution.",
      "The staging ground for Management or Staff tracks."
    ]
  },
  {
    title: "Staff Product Designer",
    level: "IC4",
    summary: "Technical Leader. Deepens craft expertise and broadens influence.",
    points: [
      "Sets the bar for quality across the org.",
      "Solves the 'wicked problems' of the architecture.",
      "Multi-team influence without people management."
    ]
  },
  {
    title: "Design Manager",
    level: "M2",
    summary: "People Leader. Focus shifts from pixels to people.",
    points: [
      "Hiring, firing, and performance reviews.",
      "Unblocking the team and setting context.",
      "Responsible for team health and operational success."
    ]
  },
  {
    title: "Principal / Director",
    level: "IC6 / M6",
    summary: "Organizational Leadership. Defining the future.",
    points: [
      "Aligning design strategy with business goals.",
      "Org structure and long-term vision.",
      "Representing Design at the executive table."
    ]
  }
];

// --- Components ---

const Header = () => (
  <div className="w-full bg-[#121A21] text-white py-6 px-4 md:px-8 border-b-4 border-[#00A59A]">
    <div className="max-w-6xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-3">
        {/* Pseudo Logo */}
        <div className="w-8 h-8 bg-[#00A59A] rounded-md flex items-center justify-center font-bold text-white text-xl">L</div>
        <h1 className="text-2xl font-bold tracking-tight">Product Design <span className="text-gray-400 font-light">Career Architecture</span></h1>
      </div>
      <div className="text-sm text-gray-400 hidden md:block">
        Confidential Internal Doc
      </div>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-[#121A21] mb-2">{title}</h2>
    <p className="text-[#475569] text-lg max-w-2xl">{subtitle}</p>
    <div className="w-16 h-1 bg-[#00A59A] mt-4 rounded-full"></div>
  </div>
);

const TrioCard = ({ icon: Icon, title, role, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-[#E6F6F5] rounded-full flex items-center justify-center text-[#00A59A] mb-4">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg text-[#121A21]">{title}</h3>
    <span className="text-xs font-semibold tracking-wider text-[#00A59A] uppercase mb-2">{role}</span>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const ContextSection = () => (
  <div className="bg-[#F7F9FB] py-12 px-4 md:px-8 rounded-3xl my-12">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-[#121A21]">The Horizontal Trio</h2>
        <p className="text-gray-600 mt-2">At Lokalise, we operate in triads. Rank doesn't define authority; the triad defines the outcome.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <TrioCard 
          icon={Target} 
          title="Product Manager" 
          role="Viability" 
          desc="Focuses on the 'Why' and 'When'. Owns the problem space and business impact." 
        />
        <TrioCard 
          icon={Users} 
          title="Eng Manager" 
          role="Feasibility" 
          desc="Focuses on the 'How'. Owns the technical architecture and delivery capabilities." 
        />
        <TrioCard 
          icon={PenTool} 
          title="Product Designer" 
          role="Desirability" 
          desc="Focuses on the 'Who' and 'What'. Owns the user experience and interface solution." 
        />
      </div>
    </div>
  </div>
);

const CareerMap = () => {
  return (
    <div className="py-12 overflow-x-auto">
      <div className="min-w-[800px] flex flex-col items-center relative space-y-8">
        
        {/* Level 6 */}
        <div className="flex w-full justify-between px-20">
          <div className="w-48 p-4 bg-[#121A21] text-white rounded-lg shadow-lg text-center border-l-4 border-[#00A59A]">
            <div className="font-bold">Director</div>
            <div className="text-xs text-gray-400">M6 • Strategy</div>
          </div>
          <div className="w-48 p-4 bg-white text-[#121A21] rounded-lg shadow-lg text-center border border-gray-200">
            <div className="font-bold">Principal</div>
            <div className="text-xs text-gray-500">IC6 • Visionary</div>
          </div>
        </div>

        {/* Connector Lvl 5-6 */}
        <div className="flex w-full justify-between px-32 h-8 relative">
          <div className="w-px h-full bg-gray-300 absolute left-[260px]"></div>
          <div className="w-px h-full bg-gray-300 absolute right-[260px]"></div>
        </div>

        {/* Level 5 */}
        <div className="flex w-full justify-between px-20">
          <div className="w-48 p-4 bg-[#121A21] text-white rounded-lg shadow-lg text-center border-l-4 border-[#00A59A]">
            <div className="font-bold">Snr Manager</div>
            <div className="text-xs text-gray-400">M3 • Org Health</div>
          </div>
          <div className="w-48 p-4 bg-white text-[#121A21] rounded-lg shadow-lg text-center border border-gray-200">
            <div className="font-bold">Snr Staff / Lead</div>
            <div className="text-xs text-gray-500">IC5 • System Impact</div>
          </div>
        </div>

         {/* Connector Lvl 4-5 */}
         <div className="flex w-full justify-between px-32 h-8 relative">
          <div className="w-px h-full bg-gray-300 absolute left-[260px]"></div>
          <div className="w-px h-full bg-gray-300 absolute right-[260px]"></div>
        </div>

        {/* Level 4 - THE PIVOT */}
        <div className="flex w-full justify-center space-x-8 items-center relative">
          
          {/* Manager M2 */}
          <div className="w-48 p-4 bg-[#121A21] text-white rounded-lg shadow-lg text-center border-l-4 border-[#00A59A] relative">
            <div className="font-bold">Manager</div>
            <div className="text-xs text-gray-400">M2 • People Support</div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[#00A59A]">
              <ArrowRight size={20} strokeWidth={3} />
            </div>
          </div>

          {/* Lead IC4 */}
          <div className="w-48 p-4 bg-teal-50 border-2 border-[#00A59A] text-[#121A21] rounded-lg shadow-lg text-center relative z-10">
            <div className="font-bold text-[#00A59A]">Lead Designer</div>
            <div className="text-xs text-gray-600">IC4 • People Prep</div>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[#00A59A] transform rotate-180">
               {/* Arrow handling in CSS above */}
            </div>
          </div>

          {/* Staff IC4 */}
          <div className="w-48 p-4 bg-white text-[#121A21] rounded-lg shadow-lg text-center border border-gray-200">
            <div className="font-bold">Staff Designer</div>
            <div className="text-xs text-gray-500">IC4 • Tech Lead</div>
          </div>

        </div>

         {/* Connector Lvl 3-4 */}
         <div className="h-12 w-px bg-gray-300"></div>

        {/* Levels 1-3 */}
        <div className="space-y-4 flex flex-col items-center w-64">
           <div className="w-full p-3 bg-white border border-gray-200 rounded-lg text-center shadow-sm">
             <span className="font-bold text-gray-700">Senior (IC3)</span>
           </div>
           <div className="h-4 w-px bg-gray-200"></div>
           <div className="w-full p-3 bg-white border border-gray-200 rounded-lg text-center shadow-sm">
             <span className="font-bold text-gray-700">Mid (IC2)</span>
           </div>
           <div className="h-4 w-px bg-gray-200"></div>
           <div className="w-full p-3 bg-white border border-gray-200 rounded-lg text-center shadow-sm opacity-70">
             <span className="font-bold text-gray-700">Junior (IC1)</span>
           </div>
        </div>

      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500 italic">
        The move from Lead (IC4) to Manager (M2) is horizontal. It is a change of profession, not a promotion.
      </div>
    </div>
  );
};

const RoleCard = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden mb-4">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-4">
          <div className={`text-sm font-bold px-2 py-1 rounded ${role.level.includes('M') ? 'bg-[#121A21] text-white' : 'bg-[#E6F6F5] text-[#00A59A]'}`}>
            {role.level}
          </div>
          <div>
            <h4 className="font-bold text-[#121A21]">{role.title}</h4>
            <p className="text-sm text-gray-500">{role.summary}</p>
          </div>
        </div>
        <div>
          {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <ul className="space-y-2">
            {role.points.map((point, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircle size={16} className="text-[#00A59A] mt-0.5 mr-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-12">
        
        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-[#121A21] mb-6 leading-tight">
              Designing the future,<br />
              <span className="text-[#00A59A]">growing together.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our competency matrix is designed to provide clarity, not boxes. 
              Whether you choose to deepen your craft as an IC or widen your influence as a Manager, 
              Lokalise provides a path for your impact.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
                <strong>IC4 &harr; M2</strong> is a pivot, not a climb.
              </div>
            </div>
          </div>
          <div className="bg-[#E6F6F5] p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Layout size={200} />
             </div>
             <h3 className="text-[#00A59A] font-bold mb-2">Director's Note</h3>
             <p className="text-[#121A21] italic">
               "Getting a promotion from Lead to Manager isn't about going higher up in rank. 
               It represents a full transition to a different role where your product is the team itself."
             </p>
          </div>
        </div>

        {/* Context Section */}
        <ContextSection />

        {/* Visual Career Path */}
        <SectionTitle 
          title="The Career Map" 
          subtitle="A dual-track system that respects craft and management equally. The Lead (IC4) role serves as the critical 'People Prep' staging ground." 
        />
        <CareerMap />

        {/* Visualization Row */}
        <div className="grid lg:grid-cols-2 gap-12 my-20">
          
          {/* Radar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-6">
               <h3 className="font-bold text-xl text-[#121A21]">Competency Shape</h3>
               <p className="text-sm text-gray-500">How the profile shifts from Senior IC to Manager</p>
             </div>
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
                   <PolarGrid />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                   <Radar
                     name="Senior (IC3)"
                     dataKey="A"
                     stroke="#94A3B8"
                     fill="#94A3B8"
                     fillOpacity={0.3}
                   />
                   <Radar
                     name="Staff (IC4)"
                     dataKey="B"
                     stroke="#00A59A"
                     fill="#00A59A"
                     fillOpacity={0.4}
                   />
                   <Radar
                     name="Manager (M2)"
                     dataKey="C"
                     stroke="#121A21"
                     fill="#121A21"
                     fillOpacity={0.5}
                   />
                   <Legend />
                   <Tooltip />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
             <p className="text-xs text-center text-gray-400 mt-4">Note the sharp pivot in "People Mgmt" vs "Visual Craft" for Managers.</p>
          </div>

          {/* Stacked Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <div className="mb-6">
               <h3 className="font-bold text-xl text-[#121A21]">Time Allocation</h3>
               <p className="text-sm text-gray-500">The "Hands-on" reality check. Why am I in meetings?</p>
             </div>
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart
                   data={timeData}
                   layout="vertical"
                   margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                 >
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                   <Tooltip />
                   <Legend />
                   <Bar dataKey="Execution" stackId="a" fill="#00A59A" name="Hands-on" />
                   <Bar dataKey="Strategy" stackId="a" fill="#5EEAD4" name="Strategy" />
                   <Bar dataKey="Mentorship" stackId="a" fill="#121A21" name="Mgmt/Mentoring" />
                 </BarChart>
               </ResponsiveContainer>
             </div>
             <p className="text-xs text-center text-gray-400 mt-4">Managers drop hands-on work to unblock others. Staff retains hands-on but adds strategy.</p>
          </div>

        </div>

        {/* Role Cards */}
        <SectionTitle 
          title="Role Expectations" 
          subtitle="A synthesized view of the levels. Click to expand details." 
        />
        <div className="max-w-3xl mx-auto">
          {roles.map((role, idx) => (
            <RoleCard key={idx} role={role} />
          ))}
        </div>

      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 mt-20 py-12 text-center text-gray-400 text-sm">
        <p>© 2024 Lokalise Product Design Organization</p>
        <p className="mt-2">Internal use only. Based on Lattice competencies.</p>
      </footer>
    </div>
  );
};

export default App;