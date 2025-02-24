import React, { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";

const TestResults = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const fetchResult = await getTestResults();
        setResult(fetchResult);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTestResult();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8 m-4">
      <div className="bg-white max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          모든 테스트 결과
        </h2>

        <TestResultList result={result} setResult={setResult} />
      </div>
    </div>
  );
};

export default TestResults;
