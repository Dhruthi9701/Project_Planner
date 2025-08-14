export default function ResultsDisplay({ idea, weeks, result }) {
  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col items-center mb-6">
        <div className="flex items-center justify-center w-full">
          <div className="bg-transparent px-4 py-2 text-gray-700 font-medium rounded-md text-center text-2xl w-full max-w-4xl break-words whitespace-pre-line border-none outline-none" style={{ background: 'none', boxShadow: 'none', wordBreak: 'break-word' }}>
            {idea}
          </div>
        </div>
        <span className="mt-2 text-gray-500 font-semibold text-lg">{weeks} week(s)</span>
      </div>
      {/* Cards Layout */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {/* Uniqueness Meter */}
        <div className="bg-blue-500 text-white p-8 rounded-3xl flex flex-col items-center justify-center flex-[1_1_350px] min-w-[350px] max-w-[500px] h-[250px] shadow-lg font-sans">
          <h2 className="text-2xl font-bold mb-4 text-center">Uniqueness Meter</h2>
          <div className="flex flex-col items-center justify-center flex-1 w-full">
            <div className="relative flex items-center justify-center w-[100px] h-[100px]">
              <img src={require('../star.png')} alt="Star" className="w-full h-full object-contain" />
              {/* Rating number centered in the star */}
              <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white translate-y-[3px]" style={{fontFamily: 'Google Sans, Arial, sans-serif'}}>
                {result ? result.evaluation : '?'}
              </span>
            </div>
            <span className="text-lg font-semibold mt-2">/10</span>
          </div>
        </div>
        {/* Weekly Execution Plan */}
        <div className="bg-green-500 text-white p-8 rounded-3xl flex-[2_1_700px] min-w-[500px] max-w-[900px] h-[250px] flex flex-col shadow-lg overflow-y-auto font-sans relative">
          <h2 className="text-2xl font-bold mb-2 text-center bg-green-500 w-full px-6 py-2">Weekly Execution Plan</h2>
          {result && result.weekly_plan ? (
              <div className="text-base">
                {(() => {
                  const lines = result.weekly_plan.split('\n').map(l => l.trim()).filter(Boolean);
                  const weekRegex = /^week\s*\d+[:]?/i;
                  const blocks = [];
                  let currentWeek = null;
                  let generalPoints = [];
                  lines.forEach(line => {
                    // Remove markdown bold/italic for heading detection
                    const plainLine = line.replace(/^[*\s]*|[*\s]*$/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
                    if (weekRegex.test(plainLine)) {
                      if (currentWeek) blocks.push(currentWeek);
                      currentWeek = { heading: plainLine.replace(/[:]+$/, ''), points: [] };
                    } else if (currentWeek) {
                      currentWeek.points.push(line.replace(/\*\*/g, '').replace(/\*/g, '').trim());
                    } else {
                      generalPoints.push(line.replace(/\*\*/g, '').replace(/\*/g, '').trim());
                    }
                  });
                  if (currentWeek) blocks.push(currentWeek);
                  return (
                    <>
                      {generalPoints.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 text-base font-normal mb-2">
                          {generalPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                      )}
                      {blocks.map((week, idx) => (
                        <div key={idx} className="mb-2">
                          <h3 className="font-semibold text-lg mb-1" style={{fontFamily: 'Google Sans, Arial, sans-serif'}}>{week.heading}</h3>
                          {week.points.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1 text-base font-normal break-words">
                              {week.points.map((pt, i) => <li key={i} className="break-words">{pt}</li>)}
                            </ul>
                          )}
                        </div>
                      ))}
                    </>
                  );
                })()}
              </div>
            ) : <div>...</div>}
        </div>
        {/* Tech Stack Recommendation */}
        <div className="bg-yellow-400 text-white p-8 rounded-3xl flex-[1_1_540px] min-w-[540px] max-w-[900px] h-[250px] flex flex-col shadow-lg overflow-y-auto font-sans relative">
          <h2 className="text-2xl font-bold mb-2 text-center bg-yellow-400 w-full px-6 py-2">Tech Stack Recommendation</h2>
          {result && result.tech_stack ? (
            <div className="text-base">
              {result.tech_stack
                // Split by subheadings (lines ending with ":")
                .split(/(?<=:)\s*\n/)
                .map((section, idx) => {
                  // Find the subheading (first line ending with ":")
                  const lines = section.split('\n').filter(l => l.trim());
                  if (lines.length === 0) return null;
                  // Subheading is the first line, remove bold and colon
                  const subheadingMatch = lines[0].match(/^(.+?):\s*$/);
                  let subheading = '';
                  let points = [];
                  if (subheadingMatch) {
                    subheading = subheadingMatch[1].trim();
                    points = lines.slice(1).map(line => line.replace(/\*\*?/g, '').trim()).filter(Boolean);
                  } else {
                    // If no subheading, treat all as points
                    points = lines.map(line => line.replace(/\*\*?/g, '').trim()).filter(Boolean);
                  }
                  return (
                    <div key={idx} className="mb-2">
                      {/* Subheading */}
                      {subheading && <span className="block mb-1 font-semibold text-lg" style={{fontFamily: 'Google Sans, Arial, sans-serif'}}>{subheading}</span>}
                      {/* Main content (bullets) */}
                      {points.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 font-normal text-base break-words">
                          {points.map((pt, i) => <li key={i} className="break-words">{pt}</li>)}
                        </ul>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : <div>...</div>}
        </div>
        {/* Overall Project Overview */}
        <div className="bg-red-500 text-white p-8 rounded-3xl flex-[1_1_540px] min-w-[540px] max-w-[900px] h-[250px] flex flex-col shadow-lg overflow-y-auto font-sans relative">
          <h2 className="text-2xl font-bold mb-2 text-center bg-red-500 w-full px-6 py-2">Overall Project Review</h2>
          {result && result.overview ? (
            (() => {
              const lines = result.overview.split('\n').map(line => line.replace(/\*\*?/g, '').trim()).filter(Boolean);
              const numbered = lines.filter(pt => /^\d+[\.\)]/.test(pt));
              const bulleted = lines.filter(pt => !/^\d+[\.\)]/.test(pt));
              return (
                <div className="text-base">
                  {/* Subheading (if any) - not always present, so skip unless you want to parse for it */}
                  {/* Main content (bullets/numbered) */}
                  {bulleted.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 text-base font-normal break-words">
                      {bulleted.map((line, idx) => <li key={idx} className="break-words">{line}</li>)}
                    </ul>
                  )}
                  {numbered.length > 0 && (
                    <ol className="list-decimal pl-5 space-y-1 text-base font-normal break-words">
                      {numbered.map((line, idx) => <li key={idx} className="break-words">{line.replace(/^\d+[\.\)]\s*/, '')}</li>)}
                    </ol>
                  )}
                </div>
              );
            })()
          ) : <div>...</div>}
        </div>
      </div>
    </div>
  );
}