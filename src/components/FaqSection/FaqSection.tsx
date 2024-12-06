import React from "react";
import Button from "../core/Button/Button";
import FaqComponent from "../FAQ/FaqComponent";
import "./FaqSection.scss";

const FaqSection = () => {
  const faqs = [
    {
      qs: "Does My Own Car Need to Be Provided for Driving Lessons, or Will You Provide the Car?",
      ans: "If you are a proficient driver and your car is roadworthy, pristine, and registered, you are free to choose to learn to drive in your own car. It is also free for you to choose to utilize the driving instructor's car, which has dual controls for increased security",
    },
    {
      qs: "Do You Provide Special Lessons to Help Students Get Ready for the Driving Test?",
      ans: `For $189= 1 lesson 45min & test,  
      $199= 1lesson 60 min & test. 
   we provides a driving test bundle that includes:
  
  • Pickup from the location of your choice
  
  •  Taking your driving test in your instructor's car
  
  • Drop to the destination of your choice
  
  Emergency  test booking need enquiry`,
    },
    {
      qs: "How many driving lessons will I need to take?",
      ans: "Your driving instructor will be in the best position to decide how many driving lessons you should take after your initial lesson based on your learning abilities. We advise taking at least 7 to 10 hours of driving lessons with a certified driving instructor if you have no prior driving experience. It is fairly unusual to schedule up to 20 hours of teaching for less self-assured students. We all learn at various rates, so it's critical to make sure you know everything covered in your driving lessons—not just so you can pass the driving test, but also so you can drive safely and competently.",
    },
    {
      qs: "What is the gift Coupon?",
      ans: "The gift coupon can be used to give someone driving lessons as a present.",
    },
    {
      qs: "What Happens if There Are No Driving Instructors Available in My Location?",
      ans: " If your search  shows no results, it means that no driving instructors are presently available in the region of your preferred pick-up location. Simply enter another convenient location and run the search once more.",
    },
    {
      qs: "Payment method for paying lessons?",
      ans: "All major debit and credit cards, including Visa, Mastercard, and American Express, are accepted as forms of payment. PayPal, Apple Pay, Google Pay, and Microsoft Pay are other payment methods we accept. Sadly, we are unable to take cash payments. Payment in full is required in order to reserve a driving lesson with an My Instructor driving instructor.",
    },
    {
      qs: "What is the duration of my driving lesson credits?",
      ans: "Additionally, up to 24 hours before the scheduled start time, our platform enables you to reschedule or cancel any existing driving lesson or driving test package appointment. A cancellation automatically credits your online account with the full amount of the driving lesson or test package.Still we consider special cases have been created to give you freedom when making reservations. You have 12 months starting from the date of purchase to use any purchased driving lesson or driving test package credits. You can be sure that your purchases won't be squandered if your circumstances change and you need to put off learning to drive",
    },
    {
      qs: "In what locations will I learn to drive? ",
      ans: "Your driving teacher will constantly work to create a comfortable learning atmosphere for you. Your driving teacher will choose a peaceful location to evaluate your driving abilities and confidence levels if you are anxious about driving or have never driven before. Only at your comfortable speed will you go from more peaceful places to more complicated traffic. The driving teacher will always think about both their own safety and your safety.Schedule a 2-hour driving class if you live in a densely populated place and are concerned that there are no peaceful areas close by. This will give you more time to get to a quieter area. After making your initial reservation, you can talk about your choices with your instructor.      ",
    },
  ];
  return (
    <section className="faq__section sectionPadding">
      <p className="title">Top Frequently Asked Questions</p>
      <div className="faq__list">
        {faqs.map((faq, key) => {
          return <FaqComponent key={key} faq={faq} />;
        })}
      </div>
      <div className="bookbutton">
        <Button title="Book Now" width="30vw" />
      </div>
    </section>
  );
};

export default FaqSection;
