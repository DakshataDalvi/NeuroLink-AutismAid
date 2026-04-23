import { LangCode } from "./translations";

export interface QuizQuestion {
  id: number;
  text: string;
  category: string;
  options: { label: string; score: number }[];
}

export interface SpecialistInfo {
  category: string;
  suggestions: string[];
}

export interface AwarenessSection {
  titleKey: string;
  content: string[];
}

export const getQuizQuestions = (lang: LangCode): QuizQuestion[] => {
  const data = quizData[lang] || quizData.en;
  return data.questions;
};

export const getSpecialists = (lang: LangCode): SpecialistInfo[] => {
  const data = quizData[lang] || quizData.en;
  return data.specialists;
};

export const getAwarenessContent = (lang: LangCode): AwarenessSection[] => {
  return awarenessData[lang] || awarenessData.en;
};

const quizData: Record<string, { questions: QuizQuestion[]; specialists: SpecialistInfo[] }> = {
  en: {
    questions: [
      { id: 1, text: "How comfortable are you making eye contact during a conversation?", category: "Social Communication", options: [{ label: "Very comfortable", score: 0 }, { label: "Somewhat comfortable", score: 1 }, { label: "It feels a bit awkward", score: 2 }, { label: "I avoid it most of the time", score: 3 }] },
      { id: 2, text: "When someone tells a joke, how easily do you understand the humor?", category: "Social Communication", options: [{ label: "I usually get it right away", score: 0 }, { label: "Sometimes I need a moment", score: 1 }, { label: "I often miss the joke", score: 2 }, { label: "I rarely understand jokes", score: 3 }] },
      { id: 3, text: "How do you feel about unexpected changes in your daily routine?", category: "Flexibility & Routine", options: [{ label: "I handle them easily", score: 0 }, { label: "I feel a little uneasy", score: 1 }, { label: "It really bothers me", score: 2 }, { label: "I get very anxious or upset", score: 3 }] },
      { id: 4, text: "Do you have very specific interests or hobbies that you focus on intensely?", category: "Focused Interests", options: [{ label: "Not really, I like many things equally", score: 0 }, { label: "I have a few favorites", score: 1 }, { label: "Yes, I focus deeply on 1-2 things", score: 2 }, { label: "Yes, I can spend hours on one topic", score: 3 }] },
      { id: 5, text: "How sensitive are you to sounds, lights, or textures?", category: "Sensory Processing", options: [{ label: "Not sensitive at all", score: 0 }, { label: "Slightly sensitive to some things", score: 1 }, { label: "Quite sensitive — some things bother me", score: 2 }, { label: "Very sensitive — it can be overwhelming", score: 3 }] },
      { id: 6, text: "How easy is it for you to understand what someone is feeling by looking at their face?", category: "Emotion Recognition", options: [{ label: "Very easy", score: 0 }, { label: "I can sometimes tell", score: 1 }, { label: "It's hard unless they tell me", score: 2 }, { label: "I usually can't tell at all", score: 3 }] },
      { id: 7, text: "In group conversations, how easy is it for you to know when it's your turn to speak?", category: "Social Communication", options: [{ label: "I naturally know when to jump in", score: 0 }, { label: "I sometimes misjudge the timing", score: 1 }, { label: "I often accidentally interrupt or stay silent", score: 2 }, { label: "I find group conversations very difficult", score: 3 }] },
      { id: 8, text: "How do you feel about meeting new people?", category: "Social Interaction", options: [{ label: "I enjoy it", score: 0 }, { label: "It's okay with some effort", score: 1 }, { label: "I find it stressful", score: 2 }, { label: "I try to avoid it", score: 3 }] },
      { id: 9, text: "Do you prefer doing things the same way every time?", category: "Flexibility & Routine", options: [{ label: "Not really, I like variety", score: 0 }, { label: "I have some preferred ways", score: 1 }, { label: "Yes, I like consistency", score: 2 }, { label: "Yes, I need things to be the same way", score: 3 }] },
      { id: 10, text: "How do you typically express your emotions?", category: "Emotion Expression", options: [{ label: "I express them easily and naturally", score: 0 }, { label: "I can express them with some effort", score: 1 }, { label: "I find it hard to show how I feel", score: 2 }, { label: "People often can't tell how I'm feeling", score: 3 }] },
    ],
    specialists: [
      { category: "Social Communication", suggestions: ["Speech-Language Pathologist (SLP) specializing in pragmatic language", "Social skills group therapy"] },
      { category: "Flexibility & Routine", suggestions: ["Cognitive Behavioral Therapist (CBT)", "Occupational Therapist for coping strategies"] },
      { category: "Sensory Processing", suggestions: ["Occupational Therapist specializing in sensory integration", "Sensory diet consultation"] },
      { category: "Emotion Recognition", suggestions: ["Child Psychologist specializing in ASD", "Social-emotional learning programs"] },
      { category: "Social Interaction", suggestions: ["Behavioral Therapist", "Peer mentoring programs"] },
      { category: "Emotion Expression", suggestions: ["Art or Music Therapist", "Child Psychologist"] },
      { category: "Focused Interests", suggestions: ["Educational Psychologist", "Mentorship programs that channel interests productively"] },
    ],
  },
  hi: {
    questions: [
      { id: 1, text: "बातचीत के दौरान आँखों से संपर्क बनाने में आप कितने सहज हैं?", category: "सामाजिक संवाद", options: [{ label: "बहुत सहज", score: 0 }, { label: "कुछ हद तक सहज", score: 1 }, { label: "थोड़ा अजीब लगता है", score: 2 }, { label: "मैं ज्यादातर समय इससे बचता हूँ", score: 3 }] },
      { id: 2, text: "जब कोई मज़ाक सुनाता है, तो आप कितनी आसानी से हास्य समझते हैं?", category: "सामाजिक संवाद", options: [{ label: "मैं आमतौर पर तुरंत समझ जाता हूँ", score: 0 }, { label: "कभी-कभी मुझे एक पल चाहिए", score: 1 }, { label: "मैं अक्सर मज़ाक नहीं समझता", score: 2 }, { label: "मैं शायद ही कभी मज़ाक समझता हूँ", score: 3 }] },
      { id: 3, text: "अपनी दैनिक दिनचर्या में अप्रत्याशित बदलावों के बारे में आप कैसा महसूस करते हैं?", category: "लचीलापन और दिनचर्या", options: [{ label: "मैं आसानी से संभाल लेता हूँ", score: 0 }, { label: "मुझे थोड़ी बेचैनी होती है", score: 1 }, { label: "यह वास्तव में मुझे परेशान करता है", score: 2 }, { label: "मैं बहुत चिंतित या परेशान हो जाता हूँ", score: 3 }] },
      { id: 4, text: "क्या आपकी बहुत विशिष्ट रुचियाँ या शौक हैं जिन पर आप गहनता से ध्यान केंद्रित करते हैं?", category: "केंद्रित रुचियाँ", options: [{ label: "नहीं, मुझे कई चीज़ें समान रूप से पसंद हैं", score: 0 }, { label: "मेरे कुछ पसंदीदा हैं", score: 1 }, { label: "हाँ, मैं 1-2 चीज़ों पर गहराई से ध्यान देता हूँ", score: 2 }, { label: "हाँ, मैं एक विषय पर घंटों बिता सकता हूँ", score: 3 }] },
      { id: 5, text: "आवाज़, रोशनी या बनावट के प्रति आप कितने संवेदनशील हैं?", category: "संवेदी प्रसंस्करण", options: [{ label: "बिल्कुल संवेदनशील नहीं", score: 0 }, { label: "कुछ चीज़ों के प्रति थोड़ा संवेदनशील", score: 1 }, { label: "काफी संवेदनशील — कुछ चीज़ें परेशान करती हैं", score: 2 }, { label: "बहुत संवेदनशील — यह भारी हो सकता है", score: 3 }] },
      { id: 6, text: "किसी के चेहरे को देखकर उनकी भावनाओं को समझना आपके लिए कितना आसान है?", category: "भावना पहचान", options: [{ label: "बहुत आसान", score: 0 }, { label: "मैं कभी-कभी बता सकता हूँ", score: 1 }, { label: "जब तक वे न बताएं, यह कठिन है", score: 2 }, { label: "मैं आमतौर पर बिल्कुल नहीं बता सकता", score: 3 }] },
      { id: 7, text: "समूह बातचीत में, आपकी बारी कब है यह जानना कितना आसान है?", category: "सामाजिक संवाद", options: [{ label: "मुझे स्वाभाविक रूप से पता चलता है कब बोलना है", score: 0 }, { label: "मैं कभी-कभी समय का गलत अनुमान लगाता हूँ", score: 1 }, { label: "मैं अक्सर गलती से बीच में बोलता हूँ या चुप रहता हूँ", score: 2 }, { label: "मुझे समूह बातचीत बहुत कठिन लगती है", score: 3 }] },
      { id: 8, text: "नए लोगों से मिलने के बारे में आप कैसा महसूस करते हैं?", category: "सामाजिक संपर्क", options: [{ label: "मुझे अच्छा लगता है", score: 0 }, { label: "कुछ प्रयास से ठीक है", score: 1 }, { label: "मुझे तनावपूर्ण लगता है", score: 2 }, { label: "मैं इससे बचने की कोशिश करता हूँ", score: 3 }] },
      { id: 9, text: "क्या आप हर बार चीज़ें एक ही तरीके से करना पसंद करते हैं?", category: "लचीलापन और दिनचर्या", options: [{ label: "नहीं, मुझे विविधता पसंद है", score: 0 }, { label: "मेरे कुछ पसंदीदा तरीके हैं", score: 1 }, { label: "हाँ, मुझे एकरूपता पसंद है", score: 2 }, { label: "हाँ, मुझे चीज़ें उसी तरह चाहिए", score: 3 }] },
      { id: 10, text: "आप आमतौर पर अपनी भावनाओं को कैसे व्यक्त करते हैं?", category: "भावना अभिव्यक्ति", options: [{ label: "मैं आसानी और स्वाभाविक रूप से व्यक्त करता हूँ", score: 0 }, { label: "कुछ प्रयास से व्यक्त कर सकता हूँ", score: 1 }, { label: "मुझे दिखाना कठिन लगता है", score: 2 }, { label: "लोग अक्सर नहीं बता सकते मैं कैसा महसूस कर रहा हूँ", score: 3 }] },
    ],
    specialists: [
      { category: "सामाजिक संवाद", suggestions: ["भाषण-भाषा रोगविज्ञानी (SLP) - व्यावहारिक भाषा विशेषज्ञ", "सामाजिक कौशल समूह चिकित्सा"] },
      { category: "लचीलापन और दिनचर्या", suggestions: ["संज्ञानात्मक व्यवहार चिकित्सक (CBT)", "मुकाबला रणनीतियों के लिए व्यावसायिक चिकित्सक"] },
      { category: "संवेदी प्रसंस्करण", suggestions: ["संवेदी एकीकरण विशेषज्ञ व्यावसायिक चिकित्सक", "संवेदी आहार परामर्श"] },
      { category: "भावना पहचान", suggestions: ["ASD विशेषज्ञ बाल मनोवैज्ञानिक", "सामाजिक-भावनात्मक शिक्षण कार्यक्रम"] },
      { category: "सामाजिक संपर्क", suggestions: ["व्यवहार चिकित्सक", "सहकर्मी मार्गदर्शन कार्यक्रम"] },
      { category: "भावना अभिव्यक्ति", suggestions: ["कला या संगीत चिकित्सक", "बाल मनोवैज्ञानिक"] },
      { category: "केंद्रित रुचियाँ", suggestions: ["शैक्षिक मनोवैज्ञानिक", "रुचियों को उत्पादक रूप से चैनल करने वाले मार्गदर्शन कार्यक्रम"] },
    ],
  },
  mr: {
    questions: [
      { id: 1, text: "संभाषणादरम्यान डोळ्यांशी संपर्क करणे तुम्हाला किती सोयीचे वाटते?", category: "सामाजिक संवाद", options: [{ label: "खूप सोयीचे", score: 0 }, { label: "काहीसे सोयीचे", score: 1 }, { label: "थोडे विचित्र वाटते", score: 2 }, { label: "मी बहुतेक वेळा टाळतो", score: 3 }] },
      { id: 2, text: "जेव्हा कोणी विनोद सांगतो, तुम्हाला विनोद किती सहज समजतो?", category: "सामाजिक संवाद", options: [{ label: "मला लगेच समजते", score: 0 }, { label: "कधी कधी एक क्षण लागतो", score: 1 }, { label: "मला अनेकदा विनोद समजत नाही", score: 2 }, { label: "मला क्वचितच विनोद समजतात", score: 3 }] },
      { id: 3, text: "तुमच्या दैनंदिन दिनचर्येत अनपेक्षित बदलांबद्दल तुम्हाला कसे वाटते?", category: "लवचिकता आणि दिनचर्या", options: [{ label: "मी सहज हाताळतो", score: 0 }, { label: "मला थोडी अस्वस्थता वाटते", score: 1 }, { label: "हे खरोखरच त्रासदायक असते", score: 2 }, { label: "मी खूप चिंताग्रस्त किंवा अस्वस्थ होतो", score: 3 }] },
      { id: 4, text: "तुमच्या खूप विशिष्ट आवडी किंवा छंद आहेत का ज्यावर तुम्ही तीव्रतेने लक्ष केंद्रित करता?", category: "केंद्रित आवडी", options: [{ label: "नाही, मला अनेक गोष्टी समान आवडतात", score: 0 }, { label: "माझे काही आवडते आहेत", score: 1 }, { label: "हो, मी 1-2 गोष्टींवर खोलवर लक्ष देतो", score: 2 }, { label: "हो, मी एका विषयावर तासन तास घालवू शकतो", score: 3 }] },
      { id: 5, text: "आवाज, प्रकाश किंवा पोत यांबद्दल तुम्ही किती संवेदनशील आहात?", category: "संवेदी प्रक्रिया", options: [{ label: "अजिबात संवेदनशील नाही", score: 0 }, { label: "काही गोष्टींबद्दल थोडे संवेदनशील", score: 1 }, { label: "बरेच संवेदनशील — काही गोष्टी त्रास देतात", score: 2 }, { label: "खूप संवेदनशील — ते जबरदस्त असू शकते", score: 3 }] },
      { id: 6, text: "एखाद्याच्या चेहऱ्याकडे पाहून त्यांच्या भावना समजणे तुम्हाला किती सोपे आहे?", category: "भावना ओळख", options: [{ label: "खूप सोपे", score: 0 }, { label: "मी कधी कधी सांगू शकतो", score: 1 }, { label: "ते सांगेपर्यंत कठीण आहे", score: 2 }, { label: "मी सहसा अजिबात सांगू शकत नाही", score: 3 }] },
      { id: 7, text: "समूह संभाषणात, तुमची बोलण्याची वेळ कधी आहे हे जाणून घेणे किती सोपे आहे?", category: "सामाजिक संवाद", options: [{ label: "मला स्वाभाविकपणे कळते कधी बोलायचे", score: 0 }, { label: "मी कधी कधी वेळेचा चुकीचा अंदाज लावतो", score: 1 }, { label: "मी अनेकदा चुकून मध्ये बोलतो किंवा शांत राहतो", score: 2 }, { label: "मला समूह संभाषण खूप कठीण वाटते", score: 3 }] },
      { id: 8, text: "नवीन लोकांना भेटण्याबद्दल तुम्हाला कसे वाटते?", category: "सामाजिक संपर्क", options: [{ label: "मला आवडते", score: 0 }, { label: "काही प्रयत्नांनी ठीक आहे", score: 1 }, { label: "मला तणावपूर्ण वाटते", score: 2 }, { label: "मी टाळण्याचा प्रयत्न करतो", score: 3 }] },
      { id: 9, text: "तुम्ही प्रत्येक वेळी गोष्टी एकाच प्रकारे करणे पसंत करता का?", category: "लवचिकता आणि दिनचर्या", options: [{ label: "नाही, मला विविधता आवडते", score: 0 }, { label: "माझे काही पसंतीचे मार्ग आहेत", score: 1 }, { label: "हो, मला सातत्य आवडते", score: 2 }, { label: "हो, मला गोष्टी त्याच प्रकारे हव्या आहेत", score: 3 }] },
      { id: 10, text: "तुम्ही साधारणपणे तुमच्या भावना कशा व्यक्त करता?", category: "भावना अभिव्यक्ती", options: [{ label: "मी सहज आणि नैसर्गिकरित्या व्यक्त करतो", score: 0 }, { label: "काही प्रयत्नांनी व्यक्त करू शकतो", score: 1 }, { label: "मला दाखवणे कठीण वाटते", score: 2 }, { label: "लोकांना अनेकदा कळत नाही मला कसे वाटतेय", score: 3 }] },
    ],
    specialists: [
      { category: "सामाजिक संवाद", suggestions: ["भाषण-भाषा रोगविज्ञानी (SLP)", "सामाजिक कौशल्य गट चिकित्सा"] },
      { category: "लवचिकता आणि दिनचर्या", suggestions: ["संज्ञानात्मक वर्तन चिकित्सक (CBT)", "सामना धोरणांसाठी व्यावसायिक चिकित्सक"] },
      { category: "संवेदी प्रक्रिया", suggestions: ["संवेदी एकत्रीकरण तज्ञ व्यावसायिक चिकित्सक", "संवेदी आहार सल्लागार"] },
      { category: "भावना ओळख", suggestions: ["ASD तज्ञ बाल मानसशास्त्रज्ञ", "सामाजिक-भावनात्मक शिक्षण कार्यक्रम"] },
      { category: "सामाजिक संपर्क", suggestions: ["वर्तन चिकित्सक", "समवयस्क मार्गदर्शन कार्यक्रम"] },
      { category: "भावना अभिव्यक्ती", suggestions: ["कला किंवा संगीत चिकित्सक", "बाल मानसशास्त्रज्ञ"] },
      { category: "केंद्रित आवडी", suggestions: ["शैक्षणिक मानसशास्त्रज्ञ", "आवडींना उत्पादकरित्या दिशा देणारे मार्गदर्शन कार्यक्रम"] },
    ],
  },
  ta: {
    questions: [
      { id: 1, text: "உரையாடலின் போது கண் தொடர்பு கொள்வது உங்களுக்கு எவ்வளவு வசதியாக இருக்கிறது?", category: "சமூக தொடர்பு", options: [{ label: "மிகவும் வசதியாக", score: 0 }, { label: "ஓரளவு வசதியாக", score: 1 }, { label: "சற்று அசௌகரியமாக உணர்கிறது", score: 2 }, { label: "பெரும்பாலான நேரம் தவிர்க்கிறேன்", score: 3 }] },
      { id: 2, text: "யாரேனும் நகைச்சுவை சொல்லும்போது, நகைச்சுவையை எவ்வளவு எளிதாக புரிந்துகொள்கிறீர்கள்?", category: "சமூக தொடர்பு", options: [{ label: "பொதுவாக உடனடியாக புரிகிறது", score: 0 }, { label: "சில நேரம் ஒரு கணம் தேவை", score: 1 }, { label: "அடிக்கடி நகைச்சுவை புரிவதில்லை", score: 2 }, { label: "நகைச்சுவை அரிதாகவே புரிகிறது", score: 3 }] },
      { id: 3, text: "உங்கள் தினசரி வழக்கத்தில் எதிர்பாராத மாற்றங்கள் பற்றி எப்படி உணர்கிறீர்கள்?", category: "நெகிழ்வுத்தன்மை & வழக்கம்", options: [{ label: "எளிதாக சமாளிக்கிறேன்", score: 0 }, { label: "சற்று அசௌகரியம் உணர்கிறேன்", score: 1 }, { label: "இது உண்மையில் என்னை தொந்தரவு செய்கிறது", score: 2 }, { label: "மிகவும் பதற்றமாக அல்லது வருத்தமாக ஆகிறேன்", score: 3 }] },
      { id: 4, text: "நீங்கள் தீவிரமாக கவனம் செலுத்தும் மிகவும் குறிப்பிட்ட ஆர்வங்கள் அல்லது பொழுதுபோக்குகள் உள்ளனவா?", category: "கவனம் செலுத்தும் ஆர்வங்கள்", options: [{ label: "இல்லை, பல விஷயங்கள் சமமாக பிடிக்கும்", score: 0 }, { label: "சில விருப்பங்கள் உள்ளன", score: 1 }, { label: "ஆம், 1-2 விஷயங்களில் ஆழமாக கவனம் செலுத்துகிறேன்", score: 2 }, { label: "ஆம், ஒரு தலைப்பில் மணிக்கணக்கில் செலவிடுவேன்", score: 3 }] },
      { id: 5, text: "ஒலிகள், ஒளிகள் அல்லது அமைப்புகளுக்கு நீங்கள் எவ்வளவு உணர்திறன் உள்ளவர்?", category: "உணர்வு செயலாக்கம்", options: [{ label: "அசல் உணர்திறன் இல்லை", score: 0 }, { label: "சில விஷயங்களுக்கு சற்று உணர்திறன்", score: 1 }, { label: "மிகவும் உணர்திறன் — சில விஷயங்கள் தொந்தரவு செய்கின்றன", score: 2 }, { label: "மிகவும் உணர்திறன் — மிகைப்படுத்தும்", score: 3 }] },
      { id: 6, text: "ஒருவரின் முகத்தைப் பார்த்து அவர்கள் எப்படி உணர்கிறார்கள் என்பதை புரிந்துகொள்வது எவ்வளவு எளிது?", category: "உணர்வு அங்கீகாரம்", options: [{ label: "மிகவும் எளிது", score: 0 }, { label: "சில நேரம் சொல்ல முடியும்", score: 1 }, { label: "அவர்கள் சொல்லாவிட்டால் கடினம்", score: 2 }, { label: "பொதுவாக சொல்ல முடிவதில்லை", score: 3 }] },
      { id: 7, text: "குழு உரையாடலில், உங்கள் பேசும் முறை எப்போது என்பதை அறிவது எவ்வளவு எளிது?", category: "சமூக தொடர்பு", options: [{ label: "இயல்பாகவே எப்போது குதிக்க வேண்டும் என்று தெரியும்", score: 0 }, { label: "சில நேரம் நேரத்தை தவறாக மதிப்பிடுகிறேன்", score: 1 }, { label: "அடிக்கடி தவறுதலாக குறுக்கிடுகிறேன் அல்லது அமைதியாக இருக்கிறேன்", score: 2 }, { label: "குழு உரையாடல்கள் மிகவும் கடினம்", score: 3 }] },
      { id: 8, text: "புதிய நபர்களை சந்திப்பது பற்றி எப்படி உணர்கிறீர்கள்?", category: "சமூக தொடர்பு", options: [{ label: "நான் ரசிக்கிறேன்", score: 0 }, { label: "சில முயற்சியுடன் பரவாயில்லை", score: 1 }, { label: "மன அழுத்தமாக உணர்கிறேன்", score: 2 }, { label: "தவிர்க்க முயற்சிக்கிறேன்", score: 3 }] },
      { id: 9, text: "ஒவ்வொரு முறையும் ஒரே வழியில் விஷயங்களை செய்ய விரும்புகிறீர்களா?", category: "நெகிழ்வுத்தன்மை & வழக்கம்", options: [{ label: "இல்லை, பல்வகைமை பிடிக்கும்", score: 0 }, { label: "சில விருப்பமான வழிகள் உள்ளன", score: 1 }, { label: "ஆம், நிலைத்தன்மை பிடிக்கும்", score: 2 }, { label: "ஆம், விஷயங்கள் அதே வழியில் இருக்க வேண்டும்", score: 3 }] },
      { id: 10, text: "நீங்கள் பொதுவாக உங்கள் உணர்வுகளை எவ்வாறு வெளிப்படுத்துகிறீர்கள்?", category: "உணர்வு வெளிப்பாடு", options: [{ label: "எளிதாகவும் இயல்பாகவும் வெளிப்படுத்துகிறேன்", score: 0 }, { label: "சில முயற்சியுடன் வெளிப்படுத்த முடியும்", score: 1 }, { label: "எப்படி உணர்கிறேன் என்பதை காட்டுவது கடினம்", score: 2 }, { label: "நான் எப்படி உணர்கிறேன் என்பது பெரும்பாலும் தெரிவதில்லை", score: 3 }] },
    ],
    specialists: [
      { category: "சமூக தொடர்பு", suggestions: ["பேச்சு-மொழி நோயியல் நிபுணர் (SLP)", "சமூக திறன் குழு சிகிச்சை"] },
      { category: "நெகிழ்வுத்தன்மை & வழக்கம்", suggestions: ["அறிவாற்றல் நடத்தை சிகிச்சையாளர் (CBT)", "சமாளிப்பு உத்திகளுக்கான தொழில்சார் சிகிச்சையாளர்"] },
      { category: "உணர்வு செயலாக்கம்", suggestions: ["உணர்வு ஒருங்கிணைப்பு நிபுணர்", "உணர்வு உணவு ஆலோசனை"] },
      { category: "உணர்வு அங்கீகாரம்", suggestions: ["ASD நிபுணர் குழந்தை உளவியலாளர்", "சமூக-உணர்வு கற்றல் திட்டங்கள்"] },
      { category: "சமூக தொடர்பு", suggestions: ["நடத்தை சிகிச்சையாளர்", "சக வழிகாட்டுதல் திட்டங்கள்"] },
      { category: "உணர்வு வெளிப்பாடு", suggestions: ["கலை அல்லது இசை சிகிச்சையாளர்", "குழந்தை உளவியலாளர்"] },
      { category: "கவனம் செலுத்தும் ஆர்வங்கள்", suggestions: ["கல்வி உளவியலாளர்", "ஆர்வங்களை உற்பத்தியாக வழிநடத்தும் வழிகாட்டுதல் திட்டங்கள்"] },
    ],
  },
  te: {
    questions: [
      { id: 1, text: "సంభాషణ సమయంలో కంటి సంబంధం ఏర్పరచడం మీకు ఎంత సౌకర్యంగా ఉంటుంది?", category: "సామాజిక సంభాషణ", options: [{ label: "చాలా సౌకర్యంగా", score: 0 }, { label: "కొంత సౌకర్యంగా", score: 1 }, { label: "కొంచెం ఇబ్బందిగా అనిపిస్తుంది", score: 2 }, { label: "చాలా సమయం తప్పిస్తాను", score: 3 }] },
      { id: 2, text: "ఎవరైనా జోక్ చెప్పినప్పుడు, హాస్యాన్ని ఎంత సులభంగా అర్థం చేసుకుంటారు?", category: "సామాజిక సంభాషణ", options: [{ label: "సాధారణంగా వెంటనే అర్థమవుతుంది", score: 0 }, { label: "కొన్నిసార్లు ఒక క్షణం అవసరం", score: 1 }, { label: "తరచుగా జోక్ అర్థం కాదు", score: 2 }, { label: "జోక్‌లు అరుదుగా అర్థమవుతాయి", score: 3 }] },
      { id: 3, text: "మీ దైనందిన దినచర్యలో ఊహించని మార్పుల గురించి ఎలా భావిస్తారు?", category: "సౌలభ్యం & దినచర్య", options: [{ label: "సులభంగా నిర్వహిస్తాను", score: 0 }, { label: "కొంచెం అసౌకర్యంగా అనిపిస్తుంది", score: 1 }, { label: "ఇది నిజంగా ఇబ్బంది పెడుతుంది", score: 2 }, { label: "చాలా ఆందోళన లేదా బాధగా ఉంటుంది", score: 3 }] },
      { id: 4, text: "మీకు తీవ్రంగా దృష్టి పెట్టే నిర్దిష్ట ఆసక్తులు లేదా అభిరుచులు ఉన్నాయా?", category: "కేంద్రీకృత ఆసక్తులు", options: [{ label: "లేదు, చాలా విషయాలు సమానంగా ఇష్టం", score: 0 }, { label: "కొన్ని ఇష్టమైనవి ఉన్నాయి", score: 1 }, { label: "అవును, 1-2 విషయాలపై లోతుగా దృష్టి పెడతాను", score: 2 }, { label: "అవును, ఒక అంశంపై గంటల సేపు గడుపుతాను", score: 3 }] },
      { id: 5, text: "శబ్దాలు, కాంతులు లేదా ఆకృతులకు మీరు ఎంత సున్నితంగా ఉంటారు?", category: "ఇంద్రియ ప్రాసెసింగ్", options: [{ label: "అసలు సున్నితం కాదు", score: 0 }, { label: "కొన్ని విషయాలకు కొంచెం సున్నితం", score: 1 }, { label: "చాలా సున్నితం — కొన్ని విషయాలు ఇబ్బంది పెడతాయి", score: 2 }, { label: "చాలా సున్నితం — ఇది అధికం కావచ్చు", score: 3 }] },
      { id: 6, text: "ఎవరి ముఖాన్ని చూసి వారి భావాలను అర్థం చేసుకోవడం మీకు ఎంత సులభం?", category: "భావోద్వేగ గుర్తింపు", options: [{ label: "చాలా సులభం", score: 0 }, { label: "కొన్నిసార్లు చెప్పగలను", score: 1 }, { label: "వారు చెప్పకపోతే కష్టం", score: 2 }, { label: "సాధారణంగా అసలు చెప్పలేను", score: 3 }] },
      { id: 7, text: "గ్రూప్ సంభాషణల్లో, మీ వంతు ఎప్పుడు అని తెలుసుకోవడం ఎంత సులభం?", category: "సామాజిక సంభాషణ", options: [{ label: "సహజంగానే తెలుస్తుంది ఎప్పుడు మాట్లాడాలో", score: 0 }, { label: "కొన్నిసార్లు సమయాన్ని తప్పుగా అంచనా వేస్తాను", score: 1 }, { label: "తరచుగా పొరపాటున అడ్డుపడతాను లేదా నిశ్శబ్దంగా ఉంటాను", score: 2 }, { label: "గ్రూప్ సంభాషణలు చాలా కష్టం", score: 3 }] },
      { id: 8, text: "కొత్త వ్యక్తులను కలవడం గురించి ఎలా భావిస్తారు?", category: "సామాజిక పరస్పర చర్య", options: [{ label: "ఇష్టపడతాను", score: 0 }, { label: "కొంత ప్రయత్నంతో బాగానే", score: 1 }, { label: "ఒత్తిడిగా అనిపిస్తుంది", score: 2 }, { label: "తప్పించుకోవడానికి ప్రయత్నిస్తాను", score: 3 }] },
      { id: 9, text: "ప్రతిసారి ఒకే విధంగా పనులు చేయడం ఇష్టపడతారా?", category: "సౌలభ్యం & దినచర్య", options: [{ label: "లేదు, వైవిధ్యం ఇష్టం", score: 0 }, { label: "కొన్ని ఇష్టమైన మార్గాలు ఉన్నాయి", score: 1 }, { label: "అవును, స్థిరత్వం ఇష్టం", score: 2 }, { label: "అవును, పనులు అలాగే ఉండాలి", score: 3 }] },
      { id: 10, text: "మీరు సాధారణంగా మీ భావోద్వేగాలను ఎలా వ్యక్తం చేస్తారు?", category: "భావోద్వేగ వ్యక్తీకరణ", options: [{ label: "సులభంగా మరియు సహజంగా వ్యక్తం చేస్తాను", score: 0 }, { label: "కొంత ప్రయత్నంతో వ్యక్తం చేయగలను", score: 1 }, { label: "నా భావాలను చూపడం కష్టం", score: 2 }, { label: "నేను ఎలా భావిస్తున్నానో తరచుగా తెలియదు", score: 3 }] },
    ],
    specialists: [
      { category: "సామాజిక సంభాషణ", suggestions: ["వాక్-భాషా రోగ నిపుణుడు (SLP)", "సామాజిక నైపుణ్యాల సమూహ చికిత్స"] },
      { category: "సౌలభ్యం & దినచర్య", suggestions: ["అభిజ్ఞా ప్రవర్తనా చికిత్సకుడు (CBT)", "ఎదుర్కొనే వ్యూహాల కోసం వృత్తిపరమైన చికిత్సకుడు"] },
      { category: "ఇంద్రియ ప్రాసెసింగ్", suggestions: ["ఇంద్రియ ఏకీకరణ నిపుణుడు", "ఇంద్రియ ఆహార సంప్రదింపు"] },
      { category: "భావోద్వేగ గుర్తింపు", suggestions: ["ASD నిపుణుడు బాల మనస్తత్వవేత్త", "సామాజిక-భావోద్వేగ అభ్యసన కార్యక్రమాలు"] },
      { category: "సామాజిక పరస్పర చర్య", suggestions: ["ప్రవర్తనా చికిత్సకుడు", "తోటివారి మార్గదర్శక కార్యక్రమాలు"] },
      { category: "భావోద్వేగ వ్యక్తీకరణ", suggestions: ["కళ లేదా సంగీత చికిత్సకుడు", "బాల మనస్తత్వవేత్త"] },
      { category: "కేంద్రీకృత ఆసక్తులు", suggestions: ["విద్యా మనస్తత్వవేత్త", "ఆసక్తులను ఉత్పాదకంగా మార్గదర్శకత్వం చేసే కార్యక్రమాలు"] },
    ],
  },
  bn: {
    questions: [
      { id: 1, text: "কথোপকথনের সময় চোখে চোখ রাখতে আপনি কতটা সহজ বোধ করেন?", category: "সামাজিক যোগাযোগ", options: [{ label: "খুব সহজ", score: 0 }, { label: "কিছুটা সহজ", score: 1 }, { label: "একটু বিব্রতকর লাগে", score: 2 }, { label: "আমি বেশিরভাগ সময় এড়িয়ে চলি", score: 3 }] },
      { id: 2, text: "কেউ যখন রসিকতা করে, আপনি কতটা সহজে হাস্যরস বুঝতে পারেন?", category: "সামাজিক যোগাযোগ", options: [{ label: "সাধারণত সাথে সাথে বুঝি", score: 0 }, { label: "কখনও একটু সময় লাগে", score: 1 }, { label: "প্রায়ই রসিকতা বুঝতে পারি না", score: 2 }, { label: "রসিকতা খুব কমই বুঝি", score: 3 }] },
      { id: 3, text: "আপনার দৈনন্দিন রুটিনে অপ্রত্যাশিত পরিবর্তন সম্পর্কে কেমন অনুভব করেন?", category: "নমনীয়তা ও রুটিন", options: [{ label: "সহজেই সামলে নিই", score: 0 }, { label: "একটু অস্বস্তি লাগে", score: 1 }, { label: "এটা সত্যিই আমাকে বিরক্ত করে", score: 2 }, { label: "খুব উদ্বিগ্ন বা মন খারাপ হয়ে যায়", score: 3 }] },
      { id: 4, text: "আপনার কি খুব নির্দিষ্ট আগ্রহ বা শখ আছে যেগুলোতে আপনি তীব্রভাবে মনোযোগ দেন?", category: "কেন্দ্রীভূত আগ্রহ", options: [{ label: "না, আমার অনেক কিছু সমানভাবে পছন্দ", score: 0 }, { label: "আমার কিছু পছন্দের আছে", score: 1 }, { label: "হ্যাঁ, ১-২ টা বিষয়ে গভীরভাবে মনোযোগ দিই", score: 2 }, { label: "হ্যাঁ, একটি বিষয়ে ঘণ্টার পর ঘণ্টা কাটাতে পারি", score: 3 }] },
      { id: 5, text: "শব্দ, আলো বা টেক্সচারের প্রতি আপনি কতটা সংবেদনশীল?", category: "সংবেদন প্রক্রিয়াকরণ", options: [{ label: "মোটেও সংবেদনশীল নই", score: 0 }, { label: "কিছু বিষয়ে সামান্য সংবেদনশীল", score: 1 }, { label: "বেশ সংবেদনশীল — কিছু বিষয় বিরক্ত করে", score: 2 }, { label: "খুব সংবেদনশীল — এটা অভিভূত হতে পারে", score: 3 }] },
      { id: 6, text: "কারো মুখ দেখে তারা কেমন অনুভব করছে তা বোঝা আপনার জন্য কতটা সহজ?", category: "আবেগ চিনতে পারা", options: [{ label: "খুব সহজ", score: 0 }, { label: "কখনও কখনও বুঝতে পারি", score: 1 }, { label: "তারা না বললে কঠিন", score: 2 }, { label: "সাধারণত বুঝতে পারি না", score: 3 }] },
      { id: 7, text: "দলীয় কথোপকথনে, আপনার কথা বলার পালা কখন তা জানা কতটা সহজ?", category: "সামাজিক যোগাযোগ", options: [{ label: "স্বাভাবিকভাবেই জানি কখন বলতে হবে", score: 0 }, { label: "কখনও সময় ভুল হয়", score: 1 }, { label: "প্রায়ই ভুলবশত মাঝখানে বলি বা চুপ থাকি", score: 2 }, { label: "দলীয় কথোপকথন খুব কঠিন লাগে", score: 3 }] },
      { id: 8, text: "নতুন মানুষের সাথে দেখা করা সম্পর্কে কেমন অনুভব করেন?", category: "সামাজিক মিথস্ক্রিয়া", options: [{ label: "উপভোগ করি", score: 0 }, { label: "কিছু চেষ্টায় ঠিক আছে", score: 1 }, { label: "চাপের মনে হয়", score: 2 }, { label: "এড়িয়ে চলার চেষ্টা করি", score: 3 }] },
      { id: 9, text: "আপনি কি প্রতিবার একই উপায়ে কাজ করতে পছন্দ করেন?", category: "নমনীয়তা ও রুটিন", options: [{ label: "না, বৈচিত্র্য পছন্দ", score: 0 }, { label: "কিছু পছন্দের উপায় আছে", score: 1 }, { label: "হ্যাঁ, সামঞ্জস্য পছন্দ", score: 2 }, { label: "হ্যাঁ, জিনিসগুলো একই রকম থাকা দরকার", score: 3 }] },
      { id: 10, text: "আপনি সাধারণত আপনার আবেগ কিভাবে প্রকাশ করেন?", category: "আবেগ প্রকাশ", options: [{ label: "সহজে এবং স্বাভাবিকভাবে প্রকাশ করি", score: 0 }, { label: "কিছু চেষ্টায় প্রকাশ করতে পারি", score: 1 }, { label: "কেমন অনুভব করছি তা দেখানো কঠিন", score: 2 }, { label: "আমি কেমন অনুভব করছি তা মানুষ বুঝতে পারে না", score: 3 }] },
    ],
    specialists: [
      { category: "সামাজিক যোগাযোগ", suggestions: ["বাক-ভাষা প্যাথোলজিস্ট (SLP)", "সামাজিক দক্ষতা গোষ্ঠী থেরাপি"] },
      { category: "নমনীয়তা ও রুটিন", suggestions: ["জ্ঞানীয় আচরণগত থেরাপিস্ট (CBT)", "মোকাবেলা কৌশলের জন্য পেশাদার থেরাপিস্ট"] },
      { category: "সংবেদন প্রক্রিয়াকরণ", suggestions: ["সংবেদন সমন্বয় বিশেষজ্ঞ", "সংবেদন খাদ্য পরামর্শ"] },
      { category: "আবেগ চিনতে পারা", suggestions: ["ASD বিশেষজ্ঞ শিশু মনোবিজ্ঞানী", "সামাজিক-আবেগ শিক্ষা কার্যক্রম"] },
      { category: "সামাজিক মিথস্ক্রিয়া", suggestions: ["আচরণগত থেরাপিস্ট", "সহকর্মী পরামর্শদাতা কার্যক্রম"] },
      { category: "আবেগ প্রকাশ", suggestions: ["শিল্প বা সঙ্গীত থেরাপিস্ট", "শিশু মনোবিজ্ঞানী"] },
      { category: "কেন্দ্রীভূত আগ্রহ", suggestions: ["শিক্ষা মনোবিজ্ঞানী", "আগ্রহকে উৎপাদনশীলভাবে পরিচালনা করার কার্যক্রম"] },
    ],
  },
  kn: {
    questions: [
      { id: 1, text: "ಸಂಭಾಷಣೆಯ ಸಮಯದಲ್ಲಿ ಕಣ್ಣಿನ ಸಂಪರ್ಕ ಮಾಡುವುದು ನಿಮಗೆ ಎಷ್ಟು ಆರಾಮದಾಯಕ?", category: "ಸಾಮಾಜಿಕ ಸಂವಹನ", options: [{ label: "ಬಹಳ ಆರಾಮದಾಯಕ", score: 0 }, { label: "ಸ್ವಲ್ಪ ಆರಾಮದಾಯಕ", score: 1 }, { label: "ಸ್ವಲ್ಪ ಅಸಹಜವಾಗಿ ಅನಿಸುತ್ತದೆ", score: 2 }, { label: "ಹೆಚ್ಚಿನ ಸಮಯ ತಪ್ಪಿಸುತ್ತೇನೆ", score: 3 }] },
      { id: 2, text: "ಯಾರಾದರೂ ಹಾಸ್ಯ ಹೇಳಿದಾಗ, ನೀವು ಎಷ್ಟು ಸುಲಭವಾಗಿ ಹಾಸ್ಯವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತೀರಿ?", category: "ಸಾಮಾಜಿಕ ಸಂವಹನ", options: [{ label: "ಸಾಮಾನ್ಯವಾಗಿ ತಕ್ಷಣ ಅರ್ಥವಾಗುತ್ತದೆ", score: 0 }, { label: "ಕೆಲವೊಮ್ಮೆ ಒಂದು ಕ್ಷಣ ಬೇಕು", score: 1 }, { label: "ಆಗಾಗ ಹಾಸ್ಯ ಅರ್ಥವಾಗುವುದಿಲ್ಲ", score: 2 }, { label: "ಹಾಸ್ಯ ಅಪರೂಪವಾಗಿ ಅರ್ಥವಾಗುತ್ತದೆ", score: 3 }] },
      { id: 3, text: "ನಿಮ್ಮ ದೈನಂದಿನ ದಿನಚರಿಯಲ್ಲಿ ಅನಿರೀಕ್ಷಿತ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ಹೇಗೆ ಅನಿಸುತ್ತದೆ?", category: "ನಮ್ಯತೆ ಮತ್ತು ದಿನಚರಿ", options: [{ label: "ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸುತ್ತೇನೆ", score: 0 }, { label: "ಸ್ವಲ್ಪ ಅಸ್ವಸ್ಥತೆ ಅನಿಸುತ್ತದೆ", score: 1 }, { label: "ಇದು ನಿಜವಾಗಿಯೂ ತೊಂದರೆ ಕೊಡುತ್ತದೆ", score: 2 }, { label: "ಬಹಳ ಆತಂಕ ಅಥವಾ ಬೇಸರವಾಗುತ್ತದೆ", score: 3 }] },
      { id: 4, text: "ನೀವು ತೀವ್ರವಾಗಿ ಗಮನ ಹರಿಸುವ ನಿರ್ದಿಷ್ಟ ಆಸಕ್ತಿಗಳು ಅಥವಾ ಹವ್ಯಾಸಗಳು ಇವೆಯೇ?", category: "ಕೇಂದ್ರೀಕೃತ ಆಸಕ್ತಿಗಳು", options: [{ label: "ಇಲ್ಲ, ಅನೇಕ ವಿಷಯಗಳು ಸಮಾನವಾಗಿ ಇಷ್ಟ", score: 0 }, { label: "ಕೆಲವು ನೆಚ್ಚಿನವು ಇವೆ", score: 1 }, { label: "ಹೌದು, 1-2 ವಿಷಯಗಳಲ್ಲಿ ಆಳವಾಗಿ ಗಮನ ಹರಿಸುತ್ತೇನೆ", score: 2 }, { label: "ಹೌದು, ಒಂದು ವಿಷಯದಲ್ಲಿ ಗಂಟೆಗಟ್ಟಲೆ ಕಳೆಯಬಲ್ಲೆ", score: 3 }] },
      { id: 5, text: "ಶಬ್ದಗಳು, ಬೆಳಕುಗಳು ಅಥವಾ ಟೆಕ್ಸ್ಚರ್‌ಗಳಿಗೆ ನೀವು ಎಷ್ಟು ಸಂವೇದನಾಶೀಲರು?", category: "ಸಂವೇದನಾ ಪ್ರಕ್ರಿಯೆ", options: [{ label: "ಅಸಲು ಸಂವೇದನಾಶೀಲನಲ್ಲ", score: 0 }, { label: "ಕೆಲವು ವಿಷಯಗಳಿಗೆ ಸ್ವಲ್ಪ ಸಂವೇದನಾಶೀಲ", score: 1 }, { label: "ಬಹಳ ಸಂವೇದನಾಶೀಲ — ಕೆಲವು ವಿಷಯಗಳು ತೊಂದರೆ ಕೊಡುತ್ತವೆ", score: 2 }, { label: "ಅತ್ಯಂತ ಸಂವೇದನಾಶೀಲ — ಇದು ಅಧಿಕವಾಗಬಹುದು", score: 3 }] },
      { id: 6, text: "ಯಾರದಾದರೂ ಮುಖ ನೋಡಿ ಅವರು ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಎಷ್ಟು ಸುಲಭ?", category: "ಭಾವನೆ ಗುರುತಿಸುವಿಕೆ", options: [{ label: "ಬಹಳ ಸುಲಭ", score: 0 }, { label: "ಕೆಲವೊಮ್ಮೆ ಹೇಳಬಲ್ಲೆ", score: 1 }, { label: "ಅವರು ಹೇಳದಿದ್ದರೆ ಕಷ್ಟ", score: 2 }, { label: "ಸಾಮಾನ್ಯವಾಗಿ ಅಸಲು ಹೇಳಲಾಗುವುದಿಲ್ಲ", score: 3 }] },
      { id: 7, text: "ಗುಂಪು ಸಂಭಾಷಣೆಗಳಲ್ಲಿ, ನಿಮ್ಮ ಸರದಿ ಯಾವಾಗ ಎಂದು ತಿಳಿಯುವುದು ಎಷ್ಟು ಸುಲಭ?", category: "ಸಾಮಾಜಿಕ ಸಂವಹನ", options: [{ label: "ಸಹಜವಾಗಿಯೇ ತಿಳಿಯುತ್ತದೆ ಯಾವಾಗ ಮಾತಾಡಬೇಕು", score: 0 }, { label: "ಕೆಲವೊಮ್ಮೆ ಸಮಯ ತಪ್ಪಾಗಿ ಅಂದಾಜಿಸುತ್ತೇನೆ", score: 1 }, { label: "ಆಗಾಗ ತಪ್ಪಾಗಿ ಮಧ್ಯೆ ಹೊಕ್ಕುತ್ತೇನೆ ಅಥವಾ ಮೌನವಾಗಿರುತ್ತೇನೆ", score: 2 }, { label: "ಗುಂಪು ಸಂಭಾಷಣೆಗಳು ಬಹಳ ಕಷ್ಟ", score: 3 }] },
      { id: 8, text: "ಹೊಸ ಜನರನ್ನು ಭೇಟಿ ಮಾಡುವ ಬಗ್ಗೆ ಹೇಗೆ ಅನಿಸುತ್ತದೆ?", category: "ಸಾಮಾಜಿಕ ಪರಸ್ಪರ ಕ್ರಿಯೆ", options: [{ label: "ಇಷ್ಟಪಡುತ್ತೇನೆ", score: 0 }, { label: "ಕೆಲವು ಪ್ರಯತ್ನದೊಂದಿಗೆ ಸರಿ", score: 1 }, { label: "ಒತ್ತಡದಾಯಕ ಅನಿಸುತ್ತದೆ", score: 2 }, { label: "ತಪ್ಪಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತೇನೆ", score: 3 }] },
      { id: 9, text: "ಪ್ರತಿ ಬಾರಿ ಒಂದೇ ರೀತಿಯಲ್ಲಿ ಕೆಲಸಗಳನ್ನು ಮಾಡಲು ಇಷ್ಟಪಡುತ್ತೀರಾ?", category: "ನಮ್ಯತೆ ಮತ್ತು ದಿನಚರಿ", options: [{ label: "ಇಲ್ಲ, ವೈವಿಧ್ಯ ಇಷ್ಟ", score: 0 }, { label: "ಕೆಲವು ಇಷ್ಟದ ಮಾರ್ಗಗಳಿವೆ", score: 1 }, { label: "ಹೌದು, ಸ್ಥಿರತೆ ಇಷ್ಟ", score: 2 }, { label: "ಹೌದು, ವಿಷಯಗಳು ಅದೇ ರೀತಿ ಇರಬೇಕು", score: 3 }] },
      { id: 10, text: "ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ಹೇಗೆ ವ್ಯಕ್ತಪಡಿಸುತ್ತೀರಿ?", category: "ಭಾವನೆ ಅಭಿವ್ಯಕ್ತಿ", options: [{ label: "ಸುಲಭವಾಗಿ ಮತ್ತು ಸಹಜವಾಗಿ ವ್ಯಕ್ತಪಡಿಸುತ್ತೇನೆ", score: 0 }, { label: "ಕೆಲವು ಪ್ರಯತ್ನದೊಂದಿಗೆ ವ್ಯಕ್ತಪಡಿಸಬಲ್ಲೆ", score: 1 }, { label: "ನನಗೆ ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ ಎಂದು ತೋರಿಸುವುದು ಕಷ್ಟ", score: 2 }, { label: "ನನಗೆ ಹೇಗೆ ಅನಿಸುತ್ತಿದೆ ಎಂದು ಜನರಿಗೆ ತಿಳಿಯುವುದಿಲ್ಲ", score: 3 }] },
    ],
    specialists: [
      { category: "ಸಾಮಾಜಿಕ ಸಂವಹನ", suggestions: ["ಮಾತು-ಭಾಷಾ ರೋಗಶಾಸ್ತ್ರಜ್ಞ (SLP)", "ಸಾಮಾಜಿಕ ಕೌಶಲ್ಯ ಗುಂಪು ಚಿಕಿತ್ಸೆ"] },
      { category: "ನಮ್ಯತೆ ಮತ್ತು ದಿನಚರಿ", suggestions: ["ಅರಿವಿನ ನಡವಳಿಕೆ ಚಿಕಿತ್ಸಕ (CBT)", "ನಿಭಾಯಿಸುವ ತಂತ್ರಗಳಿಗಾಗಿ ವೃತ್ತಿಪರ ಚಿಕಿತ್ಸಕ"] },
      { category: "ಸಂವೇದನಾ ಪ್ರಕ್ರಿಯೆ", suggestions: ["ಸಂವೇದನಾ ಏಕೀಕರಣ ತಜ್ಞ", "ಸಂವೇದನಾ ಆಹಾರ ಸಲಹೆ"] },
      { category: "ಭಾವನೆ ಗುರುತಿಸುವಿಕೆ", suggestions: ["ASD ತಜ್ಞ ಮಕ್ಕಳ ಮನೋವಿಜ್ಞಾನಿ", "ಸಾಮಾಜಿಕ-ಭಾವನಾತ್ಮಕ ಕಲಿಕೆ ಕಾರ್ಯಕ್ರಮಗಳು"] },
      { category: "ಸಾಮಾಜಿಕ ಪರಸ್ಪರ ಕ್ರಿಯೆ", suggestions: ["ನಡವಳಿಕೆ ಚಿಕಿತ್ಸಕ", "ಸಹವರ್ತಿ ಮಾರ್ಗದರ್ಶನ ಕಾರ್ಯಕ್ರಮಗಳು"] },
      { category: "ಭಾವನೆ ಅಭಿವ್ಯಕ್ತಿ", suggestions: ["ಕಲೆ ಅಥವಾ ಸಂಗೀತ ಚಿಕಿತ್ಸಕ", "ಮಕ್ಕಳ ಮನೋವಿಜ್ಞಾನಿ"] },
      { category: "ಕೇಂದ್ರೀಕೃತ ಆಸಕ್ತಿಗಳು", suggestions: ["ಶೈಕ್ಷಣಿಕ ಮನೋವಿಜ್ಞಾನಿ", "ಆಸಕ್ತಿಗಳನ್ನು ಉತ್ಪಾದಕವಾಗಿ ನಿರ್ದೇಶಿಸುವ ಮಾರ್ಗದರ್ಶನ ಕಾರ್ಯಕ್ರಮಗಳು"] },
    ],
  },
};

const awarenessData: Record<string, AwarenessSection[]> = {
  en: [
    { titleKey: "understandingAutism", content: ["High-functioning autism (often associated with what was previously called Asperger's syndrome) means the individual has strong cognitive abilities but may face challenges with social interaction, communication, and flexibility.", "Every autistic person is unique — strengths and challenges vary widely.", "Common strengths include deep focus, strong memory, attention to detail, honesty, and passionate interests.", "Challenges may include reading social cues, managing sensory input, handling change, and expressing emotions."] },
    { titleKey: "communicationStrategies", content: ["Be clear and direct — avoid idioms, sarcasm, or ambiguous language when possible.", "Give processing time — don't rush responses. Silence is okay.", "Use visual supports — written instructions, schedules, and checklists help.", "Ask specific questions instead of open-ended ones (e.g., 'Did you enjoy the game?' instead of 'How was your day?').", "Validate their communication style — some prefer texting over talking, and that's okay."] },
    { titleKey: "emotionalRegulation", content: ["Help identify emotions early — use emotion charts or mood trackers.", "Create a 'calm down' toolkit: noise-cancelling headphones, fidget tools, weighted blankets.", "Practice deep breathing together: breathe in for 4, hold for 4, out for 4.", "Recognize that meltdowns are not tantrums — they're overwhelm responses. Stay calm and provide a safe space.", "Celebrate emotional expression in any form — drawing, writing, or verbal."] },
    { titleKey: "behavioralSupport", content: ["Maintain consistent routines — give advance notice before changes.", "Use positive reinforcement — praise specific behaviors rather than general 'good job'.", "Set clear, concise expectations — 'We'll leave in 5 minutes' works better than 'We'll leave soon.'", "Avoid overstimulating environments when possible, or prepare with headphones/sunglasses.", "Respect their need for alone time — it's how they recharge, not isolation."] },
    { titleKey: "supportingIndependence", content: ["Teach life skills gradually — break tasks into small, manageable steps.", "Use social stories to prepare for new situations (doctor visits, first day of school).", "Encourage special interests — they can become career strengths and social bridges.", "Practice social scenarios at home in a low-pressure environment.", "Celebrate progress, not perfection — every small step matters."] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — information and community support.", "ASAN (Autistic Self Advocacy Network) — resources written by autistic people.", "Social Thinking (socialthinking.com) — social learning frameworks.", "Books: 'Uniquely Human' by Barry Prizant, 'The Reason I Jump' by Naoki Higashida.", "Consider connecting with local parent support groups for shared experiences."] },
  ],
  hi: [
    { titleKey: "understandingAutism", content: ["उच्च-कार्यशील ऑटिज़्म (जिसे पहले एस्पर्जर सिंड्रोम कहा जाता था) का मतलब है कि व्यक्ति में मजबूत संज्ञानात्मक क्षमताएँ हैं लेकिन सामाजिक संपर्क, संवाद और लचीलेपन में चुनौतियों का सामना कर सकता है।", "हर ऑटिस्टिक व्यक्ति अद्वितीय है — ताकत और चुनौतियाँ व्यापक रूप से भिन्न होती हैं।", "सामान्य ताकतों में गहरा ध्यान, मजबूत स्मृति, विस्तार पर ध्यान, ईमानदारी और भावुक रुचियाँ शामिल हैं।", "चुनौतियों में सामाजिक संकेत पढ़ना, संवेदी इनपुट प्रबंधित करना, बदलाव संभालना और भावनाएं व्यक्त करना शामिल हो सकता है।"] },
    { titleKey: "communicationStrategies", content: ["स्पष्ट और सीधे रहें — जहां संभव हो मुहावरों, व्यंग्य या अस्पष्ट भाषा से बचें।", "प्रसंस्करण समय दें — जवाब में जल्दबाजी न करें। मौन ठीक है।", "दृश्य सहायता का उपयोग करें — लिखित निर्देश, अनुसूची और चेकलिस्ट मदद करते हैं।", "खुले सवालों के बजाय विशिष्ट सवाल पूछें (जैसे, 'क्या आपको खेल अच्छा लगा?' बजाय 'आपका दिन कैसा रहा?')।", "उनकी संवाद शैली को मान्य करें — कुछ लोग बात करने से ज्यादा टेक्स्टिंग पसंद करते हैं, और यह ठीक है।"] },
    { titleKey: "emotionalRegulation", content: ["भावनाओं की जल्दी पहचान करें — भावना चार्ट या मूड ट्रैकर का उपयोग करें।", "'शांत हो जाओ' टूलकिट बनाएं: शोर-रद्द करने वाले हेडफोन, फिजेट टूल, भारित कंबल।", "साथ मिलकर गहरी सांस का अभ्यास करें: 4 के लिए सांस लें, 4 के लिए रोकें, 4 के लिए छोड़ें।", "पहचानें कि मेल्टडाउन गुस्सा नहीं हैं — ये अभिभूत प्रतिक्रियाएं हैं। शांत रहें और सुरक्षित स्थान प्रदान करें।", "किसी भी रूप में भावनात्मक अभिव्यक्ति का जश्न मनाएं — चित्रकारी, लेखन या मौखिक।"] },
    { titleKey: "behavioralSupport", content: ["लगातार दिनचर्या बनाए रखें — बदलाव से पहले अग्रिम सूचना दें।", "सकारात्मक सुदृढीकरण का उपयोग करें — सामान्य 'अच्छा काम' के बजाय विशिष्ट व्यवहार की प्रशंसा करें।", "स्पष्ट, संक्षिप्त अपेक्षाएं निर्धारित करें — '5 मिनट में चलेंगे' 'जल्दी चलेंगे' से बेहतर है।", "जहां संभव हो अत्यधिक उत्तेजक वातावरण से बचें, या हेडफोन/धूप का चश्मा तैयार रखें।", "उनकी अकेले रहने की जरूरत का सम्मान करें — वे इस तरह रिचार्ज होते हैं, अलगाव नहीं।"] },
    { titleKey: "supportingIndependence", content: ["जीवन कौशल धीरे-धीरे सिखाएं — कार्यों को छोटे, प्रबंधनीय चरणों में तोड़ें।", "नई स्थितियों (डॉक्टर का दौरा, स्कूल का पहला दिन) की तैयारी के लिए सामाजिक कहानियों का उपयोग करें।", "विशेष रुचियों को प्रोत्साहित करें — ये करियर की ताकत और सामाजिक पुल बन सकते हैं।", "कम दबाव वाले वातावरण में घर पर सामाजिक परिदृश्यों का अभ्यास करें।", "पूर्णता नहीं, प्रगति का जश्न मनाएं — हर छोटा कदम मायने रखता है।"] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — जानकारी और सामुदायिक सहायता।", "ASAN (ऑटिस्टिक सेल्फ एडवोकेसी नेटवर्क) — ऑटिस्टिक लोगों द्वारा लिखित संसाधन।", "Social Thinking (socialthinking.com) — सामाजिक शिक्षण ढांचे।", "पुस्तकें: बैरी प्रिज़ंट द्वारा 'Uniquely Human', नाओकी हिगाशिदा द्वारा 'The Reason I Jump'।", "साझा अनुभवों के लिए स्थानीय अभिभावक सहायता समूहों से जुड़ने पर विचार करें।"] },
  ],
  mr: [
    { titleKey: "understandingAutism", content: ["उच्च-कार्यक्षम ऑटिझम म्हणजे व्यक्तीमध्ये मजबूत संज्ञानात्मक क्षमता आहे परंतु सामाजिक संपर्क, संवाद आणि लवचिकतेमध्ये आव्हाने असू शकतात.", "प्रत्येक ऑटिस्टिक व्यक्ती अनन्य आहे — सामर्थ्य आणि आव्हाने मोठ्या प्रमाणात भिन्न आहेत.", "सामान्य सामर्थ्यांमध्ये खोल लक्ष, मजबूत स्मृती, तपशीलाकडे लक्ष, प्रामाणिकपणा आणि उत्कट आवडी यांचा समावेश होतो.", "आव्हानांमध्ये सामाजिक संकेत वाचणे, संवेदी इनपुट व्यवस्थापित करणे, बदल हाताळणे आणि भावना व्यक्त करणे यांचा समावेश असू शकतो."] },
    { titleKey: "communicationStrategies", content: ["स्पष्ट आणि थेट रहा — शक्य तिथे वाक्प्रचार, व्यंग्य किंवा अस्पष्ट भाषा टाळा.", "प्रक्रिया वेळ द्या — उत्तरात घाई करू नका. मौन ठीक आहे.", "दृश्य सहाय्य वापरा — लिखित सूचना, वेळापत्रक आणि चेकलिस्ट मदत करतात.", "मुक्त प्रश्नांऐवजी विशिष्ट प्रश्न विचारा.", "त्यांच्या संवाद शैलीला मान्यता द्या — काही लोक बोलण्यापेक्षा टेक्स्टिंग पसंत करतात."] },
    { titleKey: "emotionalRegulation", content: ["भावना लवकर ओळखा — भावना चार्ट किंवा मूड ट्रॅकर वापरा.", "'शांत व्हा' टूलकिट तयार करा: नॉईज-कॅन्सलिंग हेडफोन, फिजेट टूल्स, वेटेड ब्लँकेट.", "एकत्र खोल श्वास घ्या: ४ साठी श्वास घ्या, ४ साठी थांबा, ४ साठी सोडा.", "ओळखा की मेल्टडाउन म्हणजे गुस्सा नाही — ते अभिभूत प्रतिक्रिया आहेत. शांत राहा.", "कोणत्याही स्वरूपात भावनात्मक अभिव्यक्तीचे कौतुक करा — चित्रकला, लेखन किंवा तोंडी."] },
    { titleKey: "behavioralSupport", content: ["सातत्यपूर्ण दिनचर्या राखा — बदलापूर्वी आगाऊ सूचना द्या.", "सकारात्मक बळकटी वापरा — सामान्य 'चांगले काम' ऐवजी विशिष्ट वर्तनाचे कौतुक करा.", "स्पष्ट अपेक्षा सेट करा — '५ मिनिटांत जाऊ' हे 'लवकरच जाऊ' पेक्षा चांगले आहे.", "शक्य तिथे अतिउत्तेजक वातावरण टाळा.", "त्यांच्या एकट्या राहण्याच्या गरजेचा आदर करा."] },
    { titleKey: "supportingIndependence", content: ["जीवन कौशल्ये हळूहळू शिकवा — कार्ये लहान, व्यवस्थापनयोग्य टप्प्यांमध्ये विभागा.", "नवीन परिस्थितींसाठी तयार होण्यासाठी सामाजिक कथा वापरा.", "विशेष आवडींना प्रोत्साहन द्या — त्या करिअरची ताकद बनू शकतात.", "कमी दबावाच्या वातावरणात घरी सामाजिक परिस्थितींचा सराव करा.", "परिपूर्णता नव्हे, प्रगतीचे कौतुक करा."] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — माहिती आणि समुदाय सहाय्य.", "ASAN (ऑटिस्टिक सेल्फ अॅडव्होकसी नेटवर्क) — ऑटिस्टिक लोकांनी लिहिलेली संसाधने.", "Social Thinking (socialthinking.com) — सामाजिक शिक्षण चौकट.", "पुस्तके: Barry Prizant यांचे 'Uniquely Human', Naoki Higashida यांचे 'The Reason I Jump'.", "सामायिक अनुभवांसाठी स्थानिक पालक सहाय्य गटांशी जोडण्याचा विचार करा."] },
  ],
  ta: [
    { titleKey: "understandingAutism", content: ["உயர்-செயல்பாட்டு ஆட்டிசம் என்பது தனிநபருக்கு வலுவான அறிவாற்றல் திறன்கள் உள்ளன ஆனால் சமூக தொடர்பு, தகவல் தொடர்பு மற்றும் நெகிழ்வுத்தன்மையில் சவால்களை எதிர்கொள்ளலாம்.", "ஒவ்வொரு ஆட்டிஸ்டிக் நபரும் தனித்துவமானவர் — பலம் மற்றும் சவால்கள் பரவலாக வேறுபடுகின்றன.", "பொதுவான பலங்களில் ஆழமான கவனம், வலுவான நினைவகம், விவரங்களில் கவனம், நேர்மை மற்றும் ஆர்வமுள்ள ஆர்வங்கள் அடங்கும்.", "சவால்களில் சமூக குறிப்புகளைப் படிப்பது, உணர்வு உள்ளீட்டை நிர்வகிப்பது, மாற்றத்தைக் கையாள்வது மற்றும் உணர்வுகளை வெளிப்படுத்துவது ஆகியவை அடங்கும்."] },
    { titleKey: "communicationStrategies", content: ["தெளிவாகவும் நேரடியாகவும் இருங்கள் — முடிந்தவரை மரபுத்தொடர்கள், கிண்டல் அல்லது தெளிவற்ற மொழியைத் தவிர்க்கவும்.", "செயலாக்க நேரம் கொடுங்கள் — பதில்களை அவசரப்படுத்தாதீர்கள். மௌனம் சரி.", "காட்சி ஆதரவைப் பயன்படுத்துங்கள் — எழுத்து வழிமுறைகள், அட்டவணைகள் மற்றும் சரிபார்ப்புப் பட்டியல்கள் உதவும்.", "திறந்த கேள்விகளுக்கு பதிலாக குறிப்பிட்ட கேள்விகளைக் கேளுங்கள்.", "அவர்களின் தொடர்பு பாணியை மதிக்கவும் — சிலர் பேசுவதை விட குறுஞ்செய்தி அனுப்புவதை விரும்புவார்கள்."] },
    { titleKey: "emotionalRegulation", content: ["உணர்வுகளை முன்கூட்டியே அடையாளம் காணுங்கள் — உணர்வு விளக்கப்படங்கள் அல்லது மனநிலை கண்காணிப்பான்களைப் பயன்படுத்துங்கள்.", "'அமைதியாகு' கருவித்தொகுப்பை உருவாக்குங்கள்: சத்தம் நீக்கும் ஹெட்ஃபோன்கள், ஃபிட்ஜெட் கருவிகள், எடையுள்ள போர்வைகள்.", "ஆழ்ந்த சுவாசத்தை ஒன்றாக பயிற்சி செய்யுங்கள்: 4க்கு சுவாசிக்கவும், 4க்கு நிறுத்தவும், 4க்கு விடவும்.", "உணர்ச்சிவசப்படுதல் என்பது கோபம் அல்ல — அவை அதிக சுமை பதில்கள். அமைதியாக இருங்கள்.", "எந்த வடிவத்திலும் உணர்ச்சி வெளிப்பாட்டைக் கொண்டாடுங்கள்."] },
    { titleKey: "behavioralSupport", content: ["நிலையான வழக்கங்களை பராமரிக்கவும் — மாற்றங்களுக்கு முன் முன்னறிவிப்பு கொடுங்கள்.", "நேர்மறை வலுவூட்டலைப் பயன்படுத்துங்கள் — குறிப்பிட்ட நடத்தைகளைப் பாராட்டுங்கள்.", "தெளிவான எதிர்பார்ப்புகளை அமைக்கவும்.", "முடிந்தவரை அதிக தூண்டுதல் சூழல்களைத் தவிர்க்கவும்.", "அவர்களின் தனிமையில் இருக்க வேண்டிய தேவையை மதிக்கவும்."] },
    { titleKey: "supportingIndependence", content: ["வாழ்க்கைத் திறன்களை படிப்படியாக கற்பியுங்கள் — பணிகளை சிறிய படிகளாக பிரிக்கவும்.", "புதிய சூழ்நிலைகளுக்குத் தயாராக சமூகக் கதைகளைப் பயன்படுத்துங்கள்.", "சிறப்பு ஆர்வங்களை ஊக்குவிக்கவும் — அவை தொழில் பலமாக மாறலாம்.", "குறைந்த அழுத்த சூழலில் வீட்டில் சமூக சூழ்நிலைகளை பயிற்சி செய்யுங்கள்.", "முழுமையை அல்ல, முன்னேற்றத்தைக் கொண்டாடுங்கள்."] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — தகவல் மற்றும் சமூக ஆதரவு.", "ASAN — ஆட்டிஸ்டிக் நபர்களால் எழுதப்பட்ட வளங்கள்.", "Social Thinking (socialthinking.com) — சமூக கற்றல் கட்டமைப்புகள்.", "புத்தகங்கள்: Barry Prizant எழுதிய 'Uniquely Human', Naoki Higashida எழுதிய 'The Reason I Jump'.", "பகிரப்பட்ட அனுபவங்களுக்கு உள்ளூர் பெற்றோர் ஆதரவு குழுக்களுடன் இணைவதைக் கவனியுங்கள்."] },
  ],
  te: [
    { titleKey: "understandingAutism", content: ["అధిక-కార్యాచరణ ఆటిజం అంటే వ్యక్తికి బలమైన జ్ఞాన సామర్థ్యాలు ఉన్నాయి కానీ సామాజిక పరస్పర చర్య, సంభాషణ మరియు సౌలభ్యంలో సవాళ్లు ఎదుర్కోవచ్చు.", "ప్రతి ఆటిస్టిక్ వ్యక్తి ప్రత్యేకం — బలాలు మరియు సవాళ్లు విస్తృతంగా భిన్నంగా ఉంటాయి.", "సాధారణ బలాలలో లోతైన దృష్టి, బలమైన జ్ఞాపకశక్తి, వివరాలపై దృష్టి, నిజాయితీ మరియు ఉత్సాహపూరిత ఆసక్తులు ఉన్నాయి.", "సవాళ్లలో సామాజిక సంకేతాలు చదవడం, ఇంద్రియ ఇన్‌పుట్ నిర్వహించడం, మార్పు నిర్వహించడం మరియు భావోద్వేగాలు వ్యక్తం చేయడం ఉండవచ్చు."] },
    { titleKey: "communicationStrategies", content: ["స్పష్టంగా మరియు నేరుగా ఉండండి — సాధ్యమైనంత వరకు జాతీయాలు, వ్యంగ్యం లేదా అస్పష్ట భాషను తప్పించుకోండి.", "ప్రాసెసింగ్ సమయం ఇవ్వండి — ప్రతిస్పందనలను తొందరపెట్టకండి.", "దృశ్య మద్దతు ఉపయోగించండి — వ్రాసిన సూచనలు, షెడ్యూల్‌లు మరియు చెక్‌లిస్ట్‌లు సహాయపడతాయి.", "బహిరంగ ప్రశ్నలకు బదులుగా నిర్దిష్ట ప్రశ్నలు అడగండి.", "వారి సంభాషణ శైలిని గుర్తించండి."] },
    { titleKey: "emotionalRegulation", content: ["భావోద్వేగాలను ముందుగానే గుర్తించండి — భావోద్వేగ చార్ట్‌లు లేదా మూడ్ ట్రాకర్లు ఉపయోగించండి.", "'ప్రశాంతంగా ఉండు' టూల్‌కిట్ సృష్టించండి.", "కలిసి లోతైన శ్వాస అభ్యాసం చేయండి.", "మెల్ట్‌డౌన్‌లు కోపం కాదు — అవి అధిక స్పందనలు. ప్రశాంతంగా ఉండండి.", "ఏ రూపంలోనైనా భావోద్వేగ వ్యక్తీకరణను ప్రశంసించండి."] },
    { titleKey: "behavioralSupport", content: ["స్థిరమైన దినచర్యలను నిర్వహించండి — మార్పులకు ముందుగా తెలియజేయండి.", "సానుకూల బలోపేతాన్ని ఉపయోగించండి — నిర్దిష్ట ప్రవర్తనలను ప్రశంసించండి.", "స్పష్టమైన అంచనాలను సెట్ చేయండి.", "సాధ్యమైనంత వరకు అతిగా ఉత్తేజపరిచే వాతావరణాలను తప్పించుకోండి.", "వారి ఒంటరిగా ఉండే అవసరాన్ని గౌరవించండి."] },
    { titleKey: "supportingIndependence", content: ["జీవిత నైపుణ్యాలను క్రమంగా బోధించండి — పనులను చిన్న అడుగులుగా విభజించండి.", "కొత్త పరిస్థితులకు సిద్ధం కావడానికి సామాజిక కథలను ఉపయోగించండి.", "ప్రత్యేక ఆసక్తులను ప్రోత్సహించండి.", "తక్కువ ఒత్తిడి వాతావరణంలో ఇంట్లో సామాజిక దృశ్యాలను అభ్యసించండి.", "పరిపూర్ణత కాదు, పురోగతిని ప్రశంసించండి."] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — సమాచారం మరియు సమాజ మద్దతు.", "ASAN — ఆటిస్టిక్ వ్యక్తులు రాసిన వనరులు.", "Social Thinking (socialthinking.com) — సామాజిక అభ్యాస ఫ్రేమ్‌వర్క్‌లు.", "పుస్తకాలు: Barry Prizant రాసిన 'Uniquely Human', Naoki Higashida రాసిన 'The Reason I Jump'.", "భాగస్వామ్య అనుభవాల కోసం స్థానిక తల్లిదండ్రుల మద్దతు సమూహాలతో కనెక్ట్ అవ్వడాన్ని పరిగణించండి."] },
  ],
  bn: [
    { titleKey: "understandingAutism", content: ["উচ্চ-কার্যকারী অটিজম মানে ব্যক্তির শক্তিশালী জ্ঞানীয় ক্ষমতা আছে কিন্তু সামাজিক মিথস্ক্রিয়া, যোগাযোগ এবং নমনীয়তায় চ্যালেঞ্জের সম্মুখীন হতে পারে।", "প্রতিটি অটিস্টিক ব্যক্তি অনন্য — শক্তি এবং চ্যালেঞ্জ ব্যাপকভাবে পরিবর্তিত হয়।", "সাধারণ শক্তিগুলির মধ্যে গভীর মনোযোগ, শক্তিশালী স্মৃতি, বিশদে মনোযোগ, সততা এবং আবেগপূর্ণ আগ্রহ অন্তর্ভুক্ত।", "চ্যালেঞ্জগুলির মধ্যে সামাজিক সংকেত পড়া, সংবেদনশীল ইনপুট পরিচালনা, পরিবর্তন সামলানো এবং আবেগ প্রকাশ করা অন্তর্ভুক্ত হতে পারে।"] },
    { titleKey: "communicationStrategies", content: ["স্পষ্ট এবং সরাসরি হোন — সম্ভব হলে বাগধারা, ব্যঙ্গ বা অস্পষ্ট ভাষা এড়িয়ে চলুন।", "প্রসেসিং সময় দিন — উত্তরে তাড়াহুড়ো করবেন না।", "ভিজ্যুয়াল সাপোর্ট ব্যবহার করুন — লিখিত নির্দেশাবলী এবং চেকলিস্ট সাহায্য করে।", "খোলামেলা প্রশ্নের পরিবর্তে নির্দিষ্ট প্রশ্ন করুন।", "তাদের যোগাযোগ শৈলীকে সম্মান করুন।"] },
    { titleKey: "emotionalRegulation", content: ["আবেগ তাড়াতাড়ি চিহ্নিত করুন — আবেগ চার্ট বা মুড ট্র্যাকার ব্যবহার করুন।", "'শান্ত হও' টুলকিট তৈরি করুন।", "একসাথে গভীর শ্বাসের অনুশীলন করুন।", "মেল্টডাউন রাগ নয় — এগুলো অতিরিক্ত চাপের প্রতিক্রিয়া। শান্ত থাকুন।", "যেকোনো রূপে আবেগ প্রকাশকে উদযাপন করুন।"] },
    { titleKey: "behavioralSupport", content: ["ধারাবাহিক রুটিন বজায় রাখুন — পরিবর্তনের আগে আগাম জানান।", "ইতিবাচক শক্তিবৃদ্ধি ব্যবহার করুন — নির্দিষ্ট আচরণের প্রশংসা করুন।", "স্পষ্ট প্রত্যাশা সেট করুন।", "সম্ভব হলে অতিরিক্ত উদ্দীপক পরিবেশ এড়িয়ে চলুন।", "তাদের একা থাকার প্রয়োজনীয়তাকে সম্মান করুন।"] },
    { titleKey: "supportingIndependence", content: ["জীবন দক্ষতা ধীরে ধীরে শেখান — কাজগুলো ছোট ধাপে ভাগ করুন।", "নতুন পরিস্থিতির জন্য প্রস্তুত হতে সামাজিক গল্প ব্যবহার করুন।", "বিশেষ আগ্রহগুলো উৎসাহিত করুন।", "কম চাপের পরিবেশে বাড়িতে সামাজিক পরিস্থিতি অনুশীলন করুন।", "পরিপূর্ণতা নয়, অগ্রগতি উদযাপন করুন।"] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — তথ্য এবং সম্প্রদায় সহায়তা।", "ASAN — অটিস্টিক ব্যক্তিদের লেখা সম্পদ।", "Social Thinking (socialthinking.com) — সামাজিক শিক্ষা কাঠামো।", "বই: Barry Prizant-এর 'Uniquely Human', Naoki Higashida-এর 'The Reason I Jump'।", "ভাগ করা অভিজ্ঞতার জন্য স্থানীয় অভিভাবক সহায়তা গোষ্ঠীর সাথে সংযুক্ত হওয়ার কথা বিবেচনা করুন।"] },
  ],
  kn: [
    { titleKey: "understandingAutism", content: ["ಉನ್ನತ-ಕಾರ್ಯಕ್ಷಮತೆಯ ಆಟಿಸಂ ಎಂದರೆ ವ್ಯಕ್ತಿಗೆ ಬಲವಾದ ಅರಿವಿನ ಸಾಮರ್ಥ್ಯಗಳಿವೆ ಆದರೆ ಸಾಮಾಜಿಕ ಸಂವಹನ, ಸಂಪರ್ಕ ಮತ್ತು ನಮ್ಯತೆಯಲ್ಲಿ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಬಹುದು.", "ಪ್ರತಿ ಆಟಿಸ್ಟಿಕ್ ವ್ಯಕ್ತಿ ವಿಶಿಷ್ಟ — ಬಲ ಮತ್ತು ಸವಾಲುಗಳು ವ್ಯಾಪಕವಾಗಿ ಬೇರೆಯಾಗಿರುತ್ತವೆ.", "ಸಾಮಾನ್ಯ ಬಲಗಳಲ್ಲಿ ಆಳವಾದ ಗಮನ, ಬಲವಾದ ಸ್ಮರಣೆ, ವಿವರಗಳ ಮೇಲೆ ಗಮನ, ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ಉತ್ಸಾಹಭರಿತ ಆಸಕ್ತಿಗಳು ಸೇರಿವೆ.", "ಸವಾಲುಗಳಲ್ಲಿ ಸಾಮಾಜಿಕ ಸಂಕೇತಗಳನ್ನು ಓದುವುದು, ಸಂವೇದನಾ ಇನ್‌ಪುಟ್ ನಿರ್ವಹಿಸುವುದು, ಬದಲಾವಣೆ ನಿಭಾಯಿಸುವುದು ಮತ್ತು ಭಾವನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸುವುದು ಸೇರಿರಬಹುದು."] },
    { titleKey: "communicationStrategies", content: ["ಸ್ಪಷ್ಟ ಮತ್ತು ನೇರವಾಗಿರಿ — ಸಾಧ್ಯವಾದಷ್ಟು ನುಡಿಗಟ್ಟುಗಳು, ವ್ಯಂಗ್ಯ ಅಥವಾ ಅಸ್ಪಷ್ಟ ಭಾಷೆಯನ್ನು ತಪ್ಪಿಸಿ.", "ಪ್ರಕ್ರಿಯೆ ಸಮಯ ನೀಡಿ — ಉತ್ತರಗಳನ್ನು ಆತುರಪಡಿಸಬೇಡಿ.", "ದೃಶ್ಯ ಬೆಂಬಲ ಬಳಸಿ — ಬರೆದ ಸೂಚನೆಗಳು ಮತ್ತು ಚೆಕ್‌ಲಿಸ್ಟ್‌ಗಳು ಸಹಾಯ ಮಾಡುತ್ತವೆ.", "ಮುಕ್ತ ಪ್ರಶ್ನೆಗಳ ಬದಲಿಗೆ ನಿರ್ದಿಷ್ಟ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ.", "ಅವರ ಸಂವಹನ ಶೈಲಿಯನ್ನು ಗೌರವಿಸಿ."] },
    { titleKey: "emotionalRegulation", content: ["ಭಾವನೆಗಳನ್ನು ಬೇಗನೆ ಗುರುತಿಸಿ — ಭಾವನಾ ಚಾರ್ಟ್‌ಗಳು ಅಥವಾ ಮೂಡ್ ಟ್ರ್ಯಾಕರ್‌ಗಳನ್ನು ಬಳಸಿ.", "'ಶಾಂತವಾಗು' ಟೂಲ್‌ಕಿಟ್ ರಚಿಸಿ.", "ಒಟ್ಟಿಗೆ ಆಳವಾದ ಉಸಿರಾಟವನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.", "ಮೆಲ್ಟ್‌ಡೌನ್‌ಗಳು ಕೋಪವಲ್ಲ — ಅವು ಅಧಿಕ ಹೊರೆ ಪ್ರತಿಕ್ರಿಯೆಗಳು. ಶಾಂತವಾಗಿರಿ.", "ಯಾವುದೇ ರೂಪದಲ್ಲಿ ಭಾವನಾತ್ಮಕ ಅಭಿವ್ಯಕ್ತಿಯನ್ನು ಆಚರಿಸಿ."] },
    { titleKey: "behavioralSupport", content: ["ಸ್ಥಿರವಾದ ದಿನಚರಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ — ಬದಲಾವಣೆಗಳ ಮುಂಚೆ ಮುಂಚಿತವಾಗಿ ತಿಳಿಸಿ.", "ಧನಾತ್ಮಕ ಬಲವರ್ಧನೆ ಬಳಸಿ — ನಿರ್ದಿಷ್ಟ ನಡವಳಿಕೆಗಳನ್ನು ಹೊಗಳಿ.", "ಸ್ಪಷ್ಟ ನಿರೀಕ್ಷೆಗಳನ್ನು ಹೊಂದಿಸಿ.", "ಸಾಧ್ಯವಾದಷ್ಟು ಅತಿಯಾಗಿ ಉತ್ತೇಜಿಸುವ ಪರಿಸರಗಳನ್ನು ತಪ್ಪಿಸಿ.", "ಅವರ ಒಂಟಿ ಸಮಯದ ಅಗತ್ಯವನ್ನು ಗೌರವಿಸಿ."] },
    { titleKey: "supportingIndependence", content: ["ಜೀವನ ಕೌಶಲ್ಯಗಳನ್ನು ಕ್ರಮೇಣ ಕಲಿಸಿ — ಕಾರ್ಯಗಳನ್ನು ಸಣ್ಣ ಹಂತಗಳಾಗಿ ವಿಭಜಿಸಿ.", "ಹೊಸ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಸಿದ್ಧರಾಗಲು ಸಾಮಾಜಿಕ ಕಥೆಗಳನ್ನು ಬಳಸಿ.", "ವಿಶೇಷ ಆಸಕ್ತಿಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ.", "ಕಡಿಮೆ ಒತ್ತಡದ ಪರಿಸರದಲ್ಲಿ ಮನೆಯಲ್ಲಿ ಸಾಮಾಜಿಕ ಸನ್ನಿವೇಶಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.", "ಪರಿಪೂರ್ಣತೆ ಅಲ್ಲ, ಪ್ರಗತಿಯನ್ನು ಆಚರಿಸಿ."] },
    { titleKey: "helpfulResources", content: ["Autism Society (autismsociety.org) — ಮಾಹಿತಿ ಮತ್ತು ಸಮುದಾಯ ಬೆಂಬಲ.", "ASAN — ಆಟಿಸ್ಟಿಕ್ ವ್ಯಕ್ತಿಗಳು ಬರೆದ ಸಂಪನ್ಮೂಲಗಳು.", "Social Thinking (socialthinking.com) — ಸಾಮಾಜಿಕ ಕಲಿಕೆ ಚೌಕಟ್ಟುಗಳು.", "ಪುಸ್ತಕಗಳು: Barry Prizant ಬರೆದ 'Uniquely Human', Naoki Higashida ಬರೆದ 'The Reason I Jump'.", "ಹಂಚಿಕೊಂಡ ಅನುಭವಗಳಿಗಾಗಿ ಸ್ಥಳೀಯ ಪೋಷಕರ ಬೆಂಬಲ ಗುಂಪುಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಹೊಂದುವುದನ್ನು ಪರಿಗಣಿಸಿ."] },
  ],
};
