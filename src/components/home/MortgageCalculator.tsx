import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface MortgageValues {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

const MortgageCalculator = () => {
  const [values, setValues] = useState<MortgageValues>({
    loanAmount: 5000000, // 50 lakhs default
    interestRate: 8.5, // typical Indian home loan rate
    loanTerm: 20,
    downPayment: 20,
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculateMortgage = () => {
    const principal = values.loanAmount * (1 - values.downPayment / 100);
    const monthlyRate = values.interestRate / 100 / 12;
    const numberOfPayments = values.loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    setTotalInterest(totalInterest);
  };

  useEffect(() => {
    calculateMortgage();
  }, [values]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (field: keyof MortgageValues, value: number) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4 animate-fade-up">
            Mortgage Calculator
          </div>
          <h2 className="heading-lg text-royal-800 mb-6 animate-fade-up animate-delay-100">
            Plan Your <span className="text-gradient">Investment</span>
          </h2>
          <p className="text-royal-600 animate-fade-up animate-delay-200 max-w-2xl mx-auto">
            Use our mortgage calculator to estimate your monthly payments and see how much you can afford.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <Card className="p-6 space-y-8">
            <div className="space-y-4">
              <label className="block">
                <span className="text-royal-800 font-medium mb-2 block">Loan Amount</span>
                <div className="flex items-center space-x-4">
                  <DollarSign className="text-gold-500" size={20} />
                  <Input
                    type="number"
                    value={values.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
                <Slider
                  value={[values.loanAmount]}
                  onValueChange={(value) => handleInputChange('loanAmount', value[0])}
                  min={1000000} // 10 lakhs minimum
                  max={50000000} // 5 crores maximum
                  step={100000} // 1 lakh steps
                  className="mt-2"
                />
              </label>

              <label className="block">
                <span className="text-royal-800 font-medium mb-2 block">Interest Rate (%)</span>
                <div className="flex items-center space-x-4">
                  <Percent className="text-gold-500" size={20} />
                  <Input
                    type="number"
                    value={values.interestRate}
                    onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                    className="flex-1"
                    step="0.1"
                  />
                </div>
                <Slider
                  value={[values.interestRate]}
                  onValueChange={(value) => handleInputChange('interestRate', value[0])}
                  min={1}
                  max={15}
                  step={0.1}
                  className="mt-2"
                />
              </label>

              <label className="block">
                <span className="text-royal-800 font-medium mb-2 block">Loan Term (Years)</span>
                <div className="flex items-center space-x-4">
                  <Calendar className="text-gold-500" size={20} />
                  <Input
                    type="number"
                    value={values.loanTerm}
                    onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
                <Slider
                  value={[values.loanTerm]}
                  onValueChange={(value) => handleInputChange('loanTerm', value[0])}
                  min={5}
                  max={30}
                  step={1}
                  className="mt-2"
                />
              </label>

              <label className="block">
                <span className="text-royal-800 font-medium mb-2 block">Down Payment (%)</span>
                <div className="flex items-center space-x-4">
                  <Percent className="text-gold-500" size={20} />
                  <Input
                    type="number"
                    value={values.downPayment}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
                <Slider
                  value={[values.downPayment]}
                  onValueChange={(value) => handleInputChange('downPayment', value[0])}
                  min={0}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </label>
            </div>
          </Card>

          {/* Results Display */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-royal-50 to-royal-100 p-8 rounded-lg border border-royal-200"
            >
              <div className="flex items-center mb-6">
                <Calculator className="text-gold-500 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-royal-800">Payment Summary</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-royal-600 mb-2">Monthly Payment</p>
                  <p className="text-3xl font-bold text-royal-800">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-royal-600 mb-2">Down Payment</p>
                  <p className="text-3xl font-bold text-royal-800">
                    {formatCurrency(values.loanAmount * (values.downPayment / 100))}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-royal-600 mb-2">Total Interest</p>
                  <p className="text-3xl font-bold text-royal-800">
                    {formatCurrency(totalInterest)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-royal-600 mb-2">Total Payment</p>
                  <p className="text-3xl font-bold text-royal-800">
                    {formatCurrency(totalPayment)}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="bg-royal-50 p-6 rounded-lg border border-royal-100">
              <p className="text-sm text-royal-600">
                This calculator provides estimates for your monthly mortgage payments. The actual
                amount may vary based on additional factors such as property taxes, insurance, and
                other fees. Please consult with our financial advisors for a detailed analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;