const mongoose = require("mongoose");

const hearseContributionSchema = new mongoose.Schema({
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donatedAmount: { type: Number, required: true },
  donatedDate: { type: Date, required: true },
  note: { type: String, default: "" },
});

const hearseVehiclePageSchema = new mongoose.Schema(
  {
    pageTitle: {
      type: String,
      required: true,
      default: "Hearse Vehicle (शब बाहन) Contributions",
    },
    pageDescription: {
      type: String,
      default:
        "We are excited to announce our partnership with Kankai Municipality in Jhapa for a noble cause – the acquisition of a Hearse Vehicle(Sab Bahan).In a joint effort, Jhapali Samaj USA and Kankai Municipality have embarked on a 50/50 partnership to make this project a reality. The Hearse Vehicle holds significant importance in the community, ensuring dignified transportation for our departed loved ones.It becomes a symbol of compassion and support during challenging times, offering solace to grieving families.By contributing to this cause, you are not only supporting the acquisition of a necessary vehicle but also playing a crucial role in uplifting the spirits of those in need. Donate today and be a part of this impactful journey with Jhapali Samaj USA.",
    },
    contributions: [hearseContributionSchema],
  },
  { timestamps: true }
);

// Virtual property to calculate total donated amount
hearseVehiclePageSchema.virtual("totalDonated").get(function () {
  return this.contributions.reduce(
    (sum, contribution) => sum + contribution.donatedAmount,
    0
  );
});
hearseVehiclePageSchema.virtual("totalDonationsByYear").get(function () {
  // Create an object where the key is the year and the value is the total donations for that year
  const donationsByYear = this.contributions.reduce((acc, contribution) => {
    if (contribution.donatedDate) {
      const year = new Date(contribution.donatedDate).getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += contribution.donatedAmount;
    }
    return acc;
  }, {});

  // Return the object with total donations by year
  return donationsByYear;
});

hearseVehiclePageSchema.virtual("dateArray").get(function () {
  // Extract years from donatedDate and filter out duplicates
  const years = this.contributions
    .filter((donor) => donor.donatedDate) // Filter out any contributions without donatedDate
    .map((donor) => new Date(donor.donatedDate).getFullYear()); // Get the year from the donatedDate

  // Remove duplicates and return the sorted array
  return [...new Set(years)].sort((a, b) => a - b); // Sort the years in ascending order and remove duplicates
});

// Ensure virtual fields are included when converting to JSON or Object
hearseVehiclePageSchema.set("toJSON", { virtuals: true });
hearseVehiclePageSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("HearseVehiclePage", hearseVehiclePageSchema);
