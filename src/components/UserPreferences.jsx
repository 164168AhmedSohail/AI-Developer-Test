import React, { useState, useEffect } from "react";

const UserPreferences = ({ onPreferencesChange }) => {
  const [preferences, setPreferences] = useState({
    preferredCategories: [],
    budgetRange: { min: 0, max: 1000 },
    preferHighRated: false
  });

  const categories = ["electronics", "men's clothing", "women's clothing", "jewelery"];

  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences);
      setPreferences(parsed);
      onPreferencesChange(parsed);
    }
  }, [onPreferencesChange]);

  const handleCategoryChange = (category) => {
    const updatedCategories = preferences.preferredCategories.includes(category)
      ? preferences.preferredCategories.filter(cat => cat !== category)
      : [...preferences.preferredCategories, category];
    
    updatePreferences({ ...preferences, preferredCategories: updatedCategories });
  };

  const handleBudgetChange = (field, value) => {
    const updatedBudget = { ...preferences.budgetRange, [field]: parseInt(value) };
    updatePreferences({ ...preferences, budgetRange: updatedBudget });
  };

  const handleRatingPreferenceChange = (value) => {
    updatePreferences({ ...preferences, preferHighRated: value });
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("userPreferences", JSON.stringify(newPreferences));
    onPreferencesChange(newPreferences);
  };

  return (
    <div className="user-preferences bg-light p-4 rounded mb-4">
      <h5 className="mb-3">🎯 Set Your Preferences for Better Recommendations</h5>
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Preferred Categories:</label>
          {categories.map(category => (
            <div key={category} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={category}
                checked={preferences.preferredCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="form-check-label text-capitalize" htmlFor={category}>
                {category.replace("'s", "'s")}
              </label>
            </div>
          ))}
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Budget Range:</label>
          <div className="mb-2">
            <label htmlFor="minBudget" className="form-label small">
              Min: ${preferences.budgetRange.min}
            </label>
            <input
              type="range"
              className="form-range"
              id="minBudget"
              min="0"
              max="2000"
              value={preferences.budgetRange.min}
              onChange={(e) => handleBudgetChange("min", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxBudget" className="form-label small">
              Max: ${preferences.budgetRange.max}
            </label>
            <input
              type="range"
              className="form-range"
              id="maxBudget"
              min="0"
              max="2000"
              value={preferences.budgetRange.max}
              onChange={(e) => handleBudgetChange("max", e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label fw-bold">Other Preferences:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="preferHighRated"
              checked={preferences.preferHighRated}
              onChange={(e) => handleRatingPreferenceChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="preferHighRated">
              Prefer highly rated products (4.5+ stars)
            </label>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3" role="alert">
        <small>
          💡 Your preferences are saved locally and used to provide personalized product recommendations.
        </small>
      </div>
    </div>
  );
};

export default UserPreferences;