import { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function App() {
  const [idea, setIdea] = useState('');
  const [weeks, setWeeks] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Animated dots for loading
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDotCount(prev => (prev % 3) + 1);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDotCount(1);
    }
  }, [loading]);

  const handleSubmit = (text, weeksValue) => {
    if (text.trim().length < 50) {
      toast.error('The minimum text limit is 50 characters.');
      return;
    }
    setIdea(text);
    setWeeks(weeksValue);
    setSubmitted(true);
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: text, timeframe: weeksValue })
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch results.');
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen w-full flex relative">
      {/* Sidebar gradient */}
      <div
        className="w-8 min-h-screen"
        style={{
          background: 'linear-gradient(to bottom, #4285F4 0%, #34a853 40%, #facc15 80%, #ef4444 100%)'
        }}
      />
      {/* Logo in top left, on white area */}
      <img
        src={logo}
        alt="Logooo"
        className="absolute left-12 top-6 h-10 w-10"
        style={{ zIndex: 10 }}
      />
    
      {/* Main content centered */}
      <div className="flex-1 flex items-center justify-center">
        <ToastContainer limit={25} />
        {!submitted ? (
          <InputForm onSubmit={handleSubmit} />
        ) : loading ? (
          <div className="text-3xl font-bold text-blue-500">
            {`Thinking${'.'.repeat(dotCount)}`}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex flex-col items-center">
            <ResultsDisplay idea={idea} weeks={weeks} result={result} />
            <button
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => {
                setSubmitted(false);
                setResult(null);
                setError(null);
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;