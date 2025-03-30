import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const GoalModal = () => {
  const { isModalOpen, closeGoalModal, selectedGoal, saveGoal, deleteGoal, isDarkMode } = useDashboard();
  
  // Form state
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    current: 0,
    target: 0,
    unit: 'lbs',
    deadline: ''
  });
  
  // Set initial form data based on selected goal
  useEffect(() => {
    if (selectedGoal) {
      setFormData(selectedGoal);
    } else {
      // Reset form for new goal
      setFormData({
        id: null,
        title: '',
        description: '',
        current: 0,
        target: 0,
        unit: 'lbs',
        deadline: formatDate(getDefaultDeadline())
      });
    }
  }, [selectedGoal, isModalOpen]);
  
  // Get a default deadline (30 days from now)
  const getDefaultDeadline = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  };
  
  // Format date to YYYY-MM-DD for the input field
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };
  
  // Format date for display (e.g., Oct 31, 2023)
  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'current' || name === 'target' ? parseFloat(value) : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format deadline for display
    const formattedGoal = {
      ...formData,
      deadline: formatDisplayDate(formData.deadline)
    };
    
    saveGoal(formattedGoal);
  };
  
  // Handle goal deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(formData.id);
    }
  };
  
  if (!isModalOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={closeGoalModal}
        ></div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className={`${isDarkMode ? 'bg-[#0B192C]' : 'bg-white'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
            <h3 
              className={`text-lg leading-6 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`} 
              id="modal-title"
            >
              {selectedGoal ? 'Edit Goal' : 'Create New Goal'}
            </h3>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Goal Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                      isDarkMode 
                        ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-[#261FB3] focus:border-[#261FB3]'
                    }`}
                    placeholder="e.g., Lose Weight, Run 5K, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                      isDarkMode 
                        ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                        : 'border-gray-300 focus:ring-[#261FB3] focus:border-[#261FB3]'
                    }`}
                    placeholder="Describe your goal..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="current" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Progress
                    </label>
                    <input
                      type="number"
                      name="current"
                      id="current"
                      required
                      min="0"
                      step="any"
                      value={formData.current}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                        isDarkMode 
                          ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                          : 'border-gray-300 focus:ring-[#261FB3] focus:border-[#261FB3]'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="target" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Target
                    </label>
                    <input
                      type="number"
                      name="target"
                      id="target"
                      required
                      min="1"
                      step="any"
                      value={formData.target}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                        isDarkMode 
                          ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                          : 'border-gray-300 focus:ring-[#261FB3] focus:border-[#261FB3]'
                      }`}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="unit" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Unit
                    </label>
                    <select
                      name="unit"
                      id="unit"
                      required
                      value={formData.unit}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                        isDarkMode 
                          ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                          : 'border-gray-300 focus:ring-[#261FB3] focus:border-[#261FB3]'
                      }`}
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                      <option value="miles">miles</option>
                      <option value="km">km</option>
                      <option value="days">days</option>
                      <option value="reps">reps</option>
                      <option value="hours">hours</option>
                      <option value="percent">percent</option>
                      <option value="sessions">sessions</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      id="deadline"
                      required
                      value={formData.deadline}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm p-2 ${
                        isDarkMode 
                          ? 'bg-[#1E3E62]/50 border-[#1E3E62] text-white focus:ring-[#FF6500] focus:border-[#FF6500]' 
                          : 'border-gray-300 focus:ring-[#261FB3] focus:border-[#261FB3]'
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-6 space-x-3 flex justify-between">
                {formData.id && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                  >
                    Delete
                  </button>
                )}
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={closeGoalModal}
                    className={`inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-[#1E3E62] text-gray-300 hover:bg-[#3A6B9F]' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-[#1E3E62] ring-offset-[#0B192C]' : 'focus:ring-gray-400 ring-offset-white'}`}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium text-white ${
                      isDarkMode 
                        ? 'bg-[#FF6500] hover:bg-[#FF8533]' 
                        : 'bg-[#261FB3] hover:bg-[#5C56D4]'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isDarkMode ? 'focus:ring-[#FF6500]' : 'focus:ring-[#261FB3]'
                    }`}
                  >
                    {selectedGoal ? 'Update Goal' : 'Create Goal'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
