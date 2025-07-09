class ScoringService {
  scoreLead(lead, validation) {
    let totalScore = 0;
    const scoring = {};

    // Company size scoring (0-20 points)
    scoring.companySize = this.scoreCompanySize(validation.companySize);
    totalScore += scoring.companySize;

    // Budget range scoring (0-25 points)
    scoring.budgetScore = this.scoreBudgetRange(lead.budgetRange);
    totalScore += scoring.budgetScore;

    // Urgency/timeframe scoring (0-20 points)
    scoring.urgencyScore = this.scoreUrgency(lead.timeframe);
    totalScore += scoring.urgencyScore;

    // Validation scoring (0-35 points)
    scoring.validationScore = this.scoreValidation(validation);
    totalScore += scoring.validationScore;

    scoring.totalScore = totalScore;
    scoring.category = this.categorizeScore(totalScore);

    return scoring;
  }

  scoreCompanySize(companySize) {
    const sizeScores = {
      'enterprise': 20,
      'large': 15,
      'medium': 10,
      'small': 5,
      'unknown': 2
    };
    return sizeScores[companySize] || 0;
  }

  scoreBudgetRange(budgetRange) {
    if (!budgetRange) return 0;

    const budgetScores = {
      'Over $100,000': 25,
      '$50,000 - $100,000': 20,
      '$15,000 - $50,000': 15,
      '$5,000 - $15,000': 10,
      'Under $5,000': 5
    };
    return budgetScores[budgetRange] || 0;
  }

  scoreUrgency(timeframe) {
    if (!timeframe) return 0;

    const urgencyScores = {
      'ASAP': 20,
      '1-3 months': 15,
      '3-6 months': 10,
      '6-12 months': 5,
      '1+ years': 2
    };
    return urgencyScores[timeframe] || 0;
  }

  scoreValidation(validation) {
    let score = 0;

    // Email verification (10 points)
    if (validation.emailVerified) score += 10;

    // Company verification (8 points)
    if (validation.companyVerified) score += 8;

    // LinkedIn presence (7 points)
    if (validation.linkedinFound) score += 7;

    // Social media presence (5 points)
    if (validation.socialMediaFound) score += 5;

    // Website active (5 points)
    if (validation.websiteActive) score += 5;

    return Math.min(score, 35); // Cap at 35 points
  }

  categorizeScore(totalScore) {
    if (totalScore >= 70) return 'hot';
    if (totalScore >= 40) return 'warm';
    return 'cold';
  }
}

export const scoringService = new ScoringService();