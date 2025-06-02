
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Gift } from 'lucide-react';
import { format } from 'date-fns';

export default function CreateGiveaway() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState<Date>();
  const [prizeAmount, setPrizeAmount] = useState('');
  const [prizeDetails, setPrizeDetails] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [distributeAmount, setDistributeAmount] = useState('');

  const students = [
    'Oluwatobi',
    'ChidinmaO',
    'FatimaA',
    'EmekaF'
  ];

  const handleCreateGiveaway = () => {
    console.log('Creating giveaway:', { title, description, endDate, prizeAmount, prizeDetails });
  };

  const handleDistributePrize = () => {
    console.log('Distributing prize:', { selectedStudent, distributeAmount });
  };

  return (
    <MainLayout title="Create Giveaway">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Giveaway</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Giveaway Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giveaway Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Monthly $100 Trading Account"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the giveaway and how to participate..."
                rows={4}
              />
            </div>

            {/* End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prize Amount ($) (for cash prizes)
                </label>
                <Input
                  type="number"
                  value={prizeAmount}
                  onChange={(e) => setPrizeAmount(e.target.value)}
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            {/* Prize Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prize Details (for non-cash prizes)
              </label>
              <Input
                value={prizeDetails}
                onChange={(e) => setPrizeDetails(e.target.value)}
                placeholder="e.g., 1 Month Premium Access"
              />
            </div>

            {/* Create Button */}
            <Button
              onClick={handleCreateGiveaway}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              disabled={!title || !description}
            >
              <Gift className="h-4 w-4 mr-2" />
              Create Giveaway
            </Button>
          </CardContent>
        </Card>

        {/* Distribute Prize Section */}
        <Card>
          <CardHeader>
            <CardTitle>Distribute Giveaway Prize</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Select a student --" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>
                      {student}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prize Amount to Distribute ($)
              </label>
              <Input
                type="number"
                value={distributeAmount}
                onChange={(e) => setDistributeAmount(e.target.value)}
                placeholder="e.g., 50"
              />
            </div>

            <Button
              onClick={handleDistributePrize}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={!selectedStudent || !distributeAmount}
            >
              Distribute Prize
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
