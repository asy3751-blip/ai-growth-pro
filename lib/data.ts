export type Language = 'ar' | 'en'

export interface ToolField {
  type: 'inp' | 'ta' | 'select' | 'chips'
  key: string
  rows?: number
  label: { ar: string; en: string }
  ph?: { ar: string; en: string }
  opts?: (string | { ar: string; en: string })[]
}

export interface Tool {
  id: string
  emoji: string
  color: string
  cat: { ar: string; en: string }
  badge: { ar: string; en: string }
  name: { ar: string; en: string }
  desc: { ar: string; en: string }
  fields: ToolField[]
  prompt: (fields: Record<string, string>, lang: Language) => string
}

export const AI_TOOLS: Tool[] = [
  {
    id: 'youtube',
    emoji: '🎬',
    color: 'v-red',
    cat: { ar: 'فيديو', en: 'Video' },
    badge: { ar: 'يوتيوب', en: 'YouTube' },
    name: { ar: 'أفكار يوتيوب', en: 'YouTube Ideas' },
    desc: { ar: 'أفكار فيديو جاهزة للتنفيذ مع عناوين مُحسّنة', en: 'Ready-to-execute video ideas with optimized titles' },
    fields: [
      { type: 'inp', key: 'channel', label: { ar: 'نوع القناة', en: 'Channel Type' }, ph: { ar: 'مثال: تقنية، طبخ، لياقة...', en: 'e.g. Tech, Cooking, Fitness...' } },
      { type: 'select', key: 'format', label: { ar: 'نوع الفيديو', en: 'Video Format' }, opts: ['Shorts', 'Tutorial', 'Vlog', 'Review', 'Top 10', 'Story'] },
      { type: 'select', key: 'count', label: { ar: 'العدد', en: 'Count' }, opts: ['5', '10', '15', '20'] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `أنت خبير يوتيوب. ولّد ${f.count || '10'} أفكار فيديو لقناة ${f.channel}. النوع: ${f.format || 'متنوع'}. لكل فكرة: عنوان جذاب + hook الثواني الأولى + وصف مختصر. قائمة مرقمة فقط.`
      : `YouTube expert. Generate ${f.count || '10'} video ideas for ${f.channel} channel. Format: ${f.format || 'mixed'}. Each: catchy title + first seconds hook + brief description. Numbered list only.`
  },
  {
    id: 'marketing',
    emoji: '📣',
    color: 'v-pink',
    cat: { ar: 'تسويق', en: 'Marketing' },
    badge: { ar: 'احترافي', en: 'Pro' },
    name: { ar: 'نصوص تسويقية', en: 'Marketing Copy' },
    desc: { ar: 'كوبي مقنع يحوّل القراء لعملاء', en: 'Persuasive copy that converts readers' },
    fields: [
      { type: 'ta', key: 'product', rows: 2, label: { ar: 'المنتج/الخدمة', en: 'Product/Service' }, ph: { ar: 'صف منتجك أو خدمتك...', en: 'Describe your product...' } },
      { type: 'inp', key: 'audience', label: { ar: 'الجمهور', en: 'Audience' }, ph: { ar: 'مثال: شباب 18-30', en: 'e.g. Tech-savvy millennials' } },
      { type: 'chips', key: 'format', label: { ar: 'النوع', en: 'Format' }, opts: [{ ar: 'إعلان', en: 'Ad' }, { ar: 'إيميل', en: 'Email' }, { ar: 'لاندينج', en: 'Landing Page' }, { ar: 'جوجل', en: 'Google Ad' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `أنت كاتب كوبي خبير. اكتب نص تسويقي مقنع لـ "${f.product}" موجه لـ "${f.audience}". النوع: ${f.format || 'إعلان'}. استخدم AIDA. ابدأ بـ Hook قوي.`
      : `Expert copywriter. Write compelling ${f.format || 'ad'} copy for "${f.product}" targeting "${f.audience}". Use AIDA. Start with a powerful hook.`
  },
  {
    id: 'content_ideas',
    emoji: '💡',
    color: 'v-gold',
    cat: { ar: 'محتوى', en: 'Content' },
    badge: { ar: 'إبداعي', en: 'Creative' },
    name: { ar: 'أفكار محتوى', en: 'Content Ideas' },
    desc: { ar: 'أفكار مبتكرة لا تنفد', en: 'Never-ending creative ideas' },
    fields: [
      { type: 'inp', key: 'niche', label: { ar: 'مجالك', en: 'Your Niche' }, ph: { ar: 'مثال: لياقة، تقنية...', en: 'e.g. Fitness, Tech...' } },
      { type: 'select', key: 'platform', label: { ar: 'المنصة', en: 'Platform' }, opts: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter', 'Blog'] },
      { type: 'select', key: 'count', label: { ar: 'العدد', en: 'Count' }, opts: ['10', '20', '30'] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير محتوى رقمي. ولّد ${f.count || '20'} فكرة محتوى لمجال "${f.niche}" على ${f.platform}. نوّع بين: فيديو، كاروسيل، بوست، ريلز. قائمة منسقة فقط.`
      : `Content strategist. Generate ${f.count || '20'} creative content ideas for "${f.niche}" on ${f.platform}. Mix formats. Formatted list only.`
  },
  {
    id: 'brand_names',
    emoji: '✦',
    color: 'v-purple',
    cat: { ar: 'براندينج', en: 'Branding' },
    badge: { ar: 'جديد', en: 'New' },
    name: { ar: 'أسماء براندات', en: 'Brand Names' },
    desc: { ar: 'أسماء فريدة لعلاماتك التجارية', en: 'Unique names for your brand' },
    fields: [
      { type: 'ta', key: 'desc', rows: 2, label: { ar: 'وصف مشروعك', en: 'Describe your business' }, ph: { ar: 'ماذا تقدم؟ من جمهورك؟', en: 'What do you offer? Who is your audience?' } },
      { type: 'chips', key: 'style', label: { ar: 'الأسلوب', en: 'Style' }, opts: [{ ar: 'حديث', en: 'Modern' }, { ar: 'كلاسيك', en: 'Classic' }, { ar: 'تقني', en: 'Tech' }, { ar: 'مضحك', en: 'Playful' }] },
      { type: 'chips', key: 'lang', label: { ar: 'لغة الاسم', en: 'Language' }, opts: [{ ar: 'عربي', en: 'Arabic' }, { ar: 'إنجليزي', en: 'English' }, { ar: 'ثنائي', en: 'Both' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير براندينج. اقترح 15 اسم براند لـ "${f.desc}". الأسلوب: ${f.style || 'حديث'}. لكل اسم: الاسم + معناه + سبب تميزه. قائمة مرقمة فقط.`
      : `Branding expert. Suggest 15 brand names for "${f.desc}". Style: ${f.style || 'modern'}. For each: Name + Meaning + Why it works. Numbered list only.`
  },
  {
    id: 'instagram',
    emoji: '📸',
    color: 'v-pink',
    cat: { ar: 'سوشيال', en: 'Social' },
    badge: { ar: 'ترند', en: 'Trending' },
    name: { ar: 'محتوى إنستغرام', en: 'Instagram Content' },
    desc: { ar: 'كابشن وأفكار تضاعف تفاعلك', en: 'Captions & ideas to maximize engagement' },
    fields: [
      { type: 'ta', key: 'about', rows: 2, label: { ar: 'موضوع المنشور', en: 'Post Topic' }, ph: { ar: 'عم سيكون منشورك؟', en: 'What is your post about?' } },
      { type: 'inp', key: 'account', label: { ar: 'نوع حسابك', en: 'Account Type' }, ph: { ar: 'مثال: لياقة، مطبخ...', en: 'e.g. fitness, food...' } },
      { type: 'chips', key: 'type', label: { ar: 'النوع', en: 'Type' }, opts: [{ ar: 'كابشن', en: 'Caption' }, { ar: 'ريلز هوك', en: 'Reel Hook' }, { ar: 'كاروسيل', en: 'Carousel' }, { ar: 'ستوري', en: 'Story' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير سوشيال ميديا. اكتب محتوى إنستغرام لحساب ${f.account} عن "${f.about}". النوع: ${f.type || 'كابشن'}. أضف: إيموجي، CTA قوي، 5 هاشتاق.`
      : `Social media expert. Write Instagram ${f.type || 'caption'} for ${f.account} account about "${f.about}". Include: emojis, strong CTA, 5 hashtags.`
  },
  {
    id: 'meta',
    emoji: '🔍',
    color: 'v-green',
    cat: { ar: 'SEO', en: 'SEO' },
    badge: { ar: 'SEO', en: 'SEO' },
    name: { ar: 'ميتا تاجز', en: 'Meta Tags' },
    desc: { ar: 'SEO محسّن لأعلى ترتيب في جوجل', en: 'Optimized SEO for top Google ranking' },
    fields: [
      { type: 'inp', key: 'page', label: { ar: 'اسم الصفحة', en: 'Page Name' }, ph: { ar: 'مثال: متجر إلكتروني', en: 'e.g. Online Store' } },
      { type: 'ta', key: 'content', rows: 2, label: { ar: 'محتوى الصفحة', en: 'Page Content' }, ph: { ar: 'عم تتحدث هذه الصفحة؟', en: 'What is this page about?' } },
      { type: 'inp', key: 'keyword', label: { ar: 'الكلمة المفتاحية', en: 'Primary Keyword' }, ph: { ar: 'الكلمة التي تريد الظهور بها', en: 'Keyword to rank for' } }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير SEO. أنشئ ميتا تاجز لـ "${f.page}" عن: ${f.content}. الكلمة: "${f.keyword}".\n1. Meta Title (50-60 حرف)\n2. Meta Description (150-160 حرف)\n3. 5 كلمات مفتاحية ثانوية`
      : `SEO expert. Create meta tags for "${f.page}" about: ${f.content}. Keyword: "${f.keyword}".\n1. Meta Title (50-60 chars)\n2. Meta Description (150-160 chars)\n3. 5 secondary keywords`
  },
  {
    id: 'linkedin',
    emoji: '💼',
    color: 'v-cyan',
    cat: { ar: 'سوشيال', en: 'Social' },
    badge: { ar: 'B2B', en: 'B2B' },
    name: { ar: 'منشورات لينكدإن', en: 'LinkedIn Posts' },
    desc: { ar: 'منشورات تبني بروفايلك المهني', en: 'Posts that build your professional brand' },
    fields: [
      { type: 'ta', key: 'idea', rows: 3, label: { ar: 'الفكرة أو الخبرة', en: 'Your Idea' }, ph: { ar: 'شارك تجربة، درس تعلمته...', en: 'Share an experience, lesson learned...' } },
      { type: 'chips', key: 'tone', label: { ar: 'الأسلوب', en: 'Tone' }, opts: [{ ar: 'قصة', en: 'Story' }, { ar: 'نصائح', en: 'Tips' }, { ar: 'رأي جريء', en: 'Bold Opinion' }, { ar: 'إنجاز', en: 'Achievement' }] },
      { type: 'select', key: 'length', label: { ar: 'الطول', en: 'Length' }, opts: [{ ar: 'قصير', en: 'Short' }, { ar: 'متوسط', en: 'Medium' }, { ar: 'طويل', en: 'Long' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير LinkedIn. اكتب منشور عن: "${f.idea}". الأسلوب: ${f.tone || 'قصة'}. الطول: ${f.length || 'متوسط'}. Hook قوي + قيمة حقيقية + سؤال للنقاش.`
      : `LinkedIn expert. Write a post about: "${f.idea}". Style: ${f.tone || 'story'}. Length: ${f.length || 'medium'}. Strong hook + real value + discussion question.`
  },
  {
    id: 'business_plan',
    emoji: '📊',
    color: 'v-teal',
    cat: { ar: 'أعمال', en: 'Business' },
    badge: { ar: 'شامل', en: 'Complete' },
    name: { ar: 'خطط عمل', en: 'Business Plans' },
    desc: { ar: 'خطط هيكلية مقنعة للمستثمرين', en: 'Structured plans for investors' },
    fields: [
      { type: 'inp', key: 'name', label: { ar: 'اسم المشروع', en: 'Business Name' }, ph: { ar: 'اسم شركتك...', en: 'Your company name...' } },
      { type: 'ta', key: 'idea', rows: 3, label: { ar: 'فكرة المشروع', en: 'Business Idea' }, ph: { ar: 'وصف مختصر، المنتج، الجمهور...', en: 'Brief description, product, audience...' } },
      { type: 'chips', key: 'section', label: { ar: 'القسم', en: 'Section' }, opts: [{ ar: 'الملخص التنفيذي', en: 'Executive Summary' }, { ar: 'السوق المستهدف', en: 'Target Market' }, { ar: 'النموذج التجاري', en: 'Business Model' }, { ar: 'الخطة الكاملة', en: 'Full Plan' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `مستشار أعمال خبير. اكتب ${f.section || 'ملخصاً تنفيذياً'} لمشروع "${f.name}": ${f.idea}. منظم بعناوين واضحة، مقنع للمستثمرين.`
      : `Expert business consultant. Write a professional ${f.section || 'executive summary'} for "${f.name}": ${f.idea}. Structured headings, compelling for investors.`
  },
  {
    id: 'threads',
    emoji: '🧵',
    color: 'v-orange',
    cat: { ar: 'سوشيال', en: 'Social' },
    badge: { ar: 'فيروسي', en: 'Viral' },
    name: { ar: 'ثريدات', en: 'Threads' },
    desc: { ar: 'ثريدات ملتهبة تحوّل المتابعين', en: 'Viral threads that hook your audience' },
    fields: [
      { type: 'ta', key: 'topic', rows: 2, label: { ar: 'موضوع الثريد', en: 'Thread Topic' }, ph: { ar: 'موضوع أريد أن أكتب عنه ثريداً...', en: 'Topic for my thread...' } },
      { type: 'select', key: 'tweets', label: { ar: 'عدد المنشورات', en: 'Number of Posts' }, opts: ['5', '8', '10', '15'] },
      { type: 'chips', key: 'style', label: { ar: 'الأسلوب', en: 'Style' }, opts: [{ ar: 'تعليمي', en: 'Educational' }, { ar: 'قصة', en: 'Story' }, { ar: 'نصائح', en: 'Tips' }, { ar: 'صادم', en: 'Shocking' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `كاتب ثريدات فيروسية. اكتب ثريد ${f.tweets || '8'} منشورات عن "${f.topic}". الأسلوب: ${f.style || 'تعليمي'}. كل منشور ≤280 حرف ينتهي بـ hook. رقّم (1/${f.tweets || '8'}).`
      : `Viral thread writer. Write ${f.tweets || '8'}-part thread about "${f.topic}". Style: ${f.style || 'educational'}. Each post ≤280 chars ending with a hook. Number each (1/${f.tweets || '8'}).`
  },
  {
    id: 'product_desc',
    emoji: '🛍️',
    color: 'v-purple',
    cat: { ar: 'تسويق', en: 'Marketing' },
    badge: { ar: 'مبيعات', en: 'Sales' },
    name: { ar: 'وصف منتجات', en: 'Product Description' },
    desc: { ar: 'أوصاف تبيع بنفسها وتزيد التحويل', en: 'Descriptions that sell & boost conversions' },
    fields: [
      { type: 'inp', key: 'product', label: { ar: 'اسم المنتج', en: 'Product Name' }, ph: { ar: 'اسم منتجك...', en: 'Your product name...' } },
      { type: 'ta', key: 'features', rows: 3, label: { ar: 'المميزات والفوائد', en: 'Features & Benefits' }, ph: { ar: 'اذكر المميزات الرئيسية...', en: 'List the main features...' } },
      { type: 'select', key: 'tone', label: { ar: 'الأسلوب', en: 'Tone' }, opts: [{ ar: 'فاخر', en: 'Luxury' }, { ar: 'عملي', en: 'Practical' }, { ar: 'تقني', en: 'Technical' }, { ar: 'ممتع', en: 'Fun' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `كاتب كوبي تجارة إلكترونية. اكتب وصف لـ "${f.product}". المميزات: ${f.features}. الأسلوب: ${f.tone || 'عملي'}. فوائد لا مواصفات. CTA. 100-200 كلمة.`
      : `E-commerce copywriter. Write product description for "${f.product}". Features: ${f.features}. Tone: ${f.tone || 'practical'}. Benefits not specs. CTA. 100-200 words.`
  },
  {
    id: 'ai_prompts',
    emoji: '🤖',
    color: 'v-teal',
    cat: { ar: 'ذكاء اصطناعي', en: 'AI' },
    badge: { ar: 'متقدم', en: 'Advanced' },
    name: { ar: 'برومتات AI', en: 'AI Prompts' },
    desc: { ar: 'برومتات تستخرج أفضل نتائج AI', en: 'Expert prompts for best AI results' },
    fields: [
      { type: 'ta', key: 'task', rows: 2, label: { ar: 'المهمة المطلوبة', en: 'Task Needed' }, ph: { ar: 'ماذا تريد من AI؟', en: 'What do you want AI to do?' } },
      { type: 'select', key: 'tool', label: { ar: 'أداة AI', en: 'AI Tool' }, opts: ['ChatGPT / Claude', 'Midjourney', 'DALL-E', 'Gemini', 'Copilot'] },
      { type: 'chips', key: 'style', label: { ar: 'أسلوب البرومت', en: 'Style' }, opts: [{ ar: 'مفصل', en: 'Detailed' }, { ar: 'نظام', en: 'System' }, { ar: 'دور محدد', en: 'Role-Based' }, { ar: 'سلسلة أفكار', en: 'Chain of Thought' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير هندسة برومتات. اكتب ${f.style || 'برومتاً مفصلاً'} لـ ${f.tool || 'ChatGPT'} لأداء: "${f.task}". قدم 3 نسخ بترتيب تصاعدي في التفصيل.`
      : `Prompt engineering expert. Write ${f.style || 'detailed'} prompt for ${f.tool || 'ChatGPT'} to: "${f.task}". Provide 3 versions in ascending detail.`
  },
  {
    id: 'video_script',
    emoji: '🎬',
    color: 'v-red',
    cat: { ar: 'فيديو', en: 'Video' },
    badge: { ar: 'سكريبت', en: 'Script' },
    name: { ar: 'سكريبتات فيديو', en: 'Video Scripts' },
    desc: { ar: 'سكريبتات تُشرك المشاهد من ثانية 1', en: 'Scripts that engage from second one' },
    fields: [
      { type: 'ta', key: 'topic', rows: 2, label: { ar: 'موضوع الفيديو', en: 'Video Topic' }, ph: { ar: 'موضوع الفيديو وهدفه...', en: 'Video topic and main goal...' } },
      { type: 'inp', key: 'duration', label: { ar: 'المدة', en: 'Duration' }, ph: { ar: 'مثال: 60 ثانية، 5 دقائق...', en: 'e.g. 60 seconds, 5 minutes...' } },
      { type: 'select', key: 'platform', label: { ar: 'المنصة', en: 'Platform' }, opts: ['YouTube', 'TikTok / Reels', 'Instagram', 'Podcast'] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `كاتب سيناريو محترف. اكتب سكريبت لـ "${f.topic}" على ${f.platform}، مدته ${f.duration || '60 ثانية'}. Hook (5ث) + مقدمة + محتوى + خاتمة + CTA. تعليمات مخرج [بأقواس].`
      : `Professional scriptwriter. Write script for "${f.topic}" on ${f.platform}, duration: ${f.duration || '60 seconds'}. Hook (5s) + Intro + Content + Outro + CTA. Director notes [in brackets].`
  },
  {
    id: 'email',
    emoji: '📧',
    color: 'v-gold',
    cat: { ar: 'تسويق', en: 'Marketing' },
    badge: { ar: 'إيميل', en: 'Email' },
    name: { ar: 'إغلاقات إيميل', en: 'Email Closings' },
    desc: { ar: 'إغلاقات ترفع معدلات الرد والتحويل', en: 'Closings that boost reply rates' },
    fields: [
      { type: 'ta', key: 'email_about', rows: 2, label: { ar: 'موضوع الإيميل', en: 'Email Topic' }, ph: { ar: 'عم يتحدث الإيميل؟', en: 'What is the email about?' } },
      { type: 'chips', key: 'goal', label: { ar: 'الهدف', en: 'Goal' }, opts: [{ ar: 'موعد', en: 'Meeting' }, { ar: 'بيع', en: 'Sale' }, { ar: 'شراكة', en: 'Partnership' }, { ar: 'متابعة', en: 'Follow Up' }] },
      { type: 'select', key: 'tone', label: { ar: 'الأسلوب', en: 'Tone' }, opts: [{ ar: 'مهني', en: 'Professional' }, { ar: 'ودي', en: 'Friendly' }, { ar: 'مقنع', en: 'Persuasive' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير بريد إلكتروني. اكتب 5 إغلاقات إيميل لـ "${f.email_about}". الهدف: ${f.goal || 'متابعة'}. الأسلوب: ${f.tone || 'مهني'}. كل إغلاق: CTA + urgency + subject line مقترح.`
      : `Email marketing expert. Write 5 email closings for "${f.email_about}". Goal: ${f.goal || 'follow up'}. Tone: ${f.tone || 'professional'}. Each: CTA + urgency + subject line.`
  },
  {
    id: 'hashtags_gen',
    emoji: '#️⃣',
    color: 'v-green',
    cat: { ar: 'سوشيال', en: 'Social' },
    badge: { ar: 'تحسين', en: 'Boost' },
    name: { ar: 'توليد هاشتاقات AI', en: 'AI Hashtags' },
    desc: { ar: 'مجموعات هاشتاق محسّنة تزيد وصولك', en: 'Optimized hashtag sets to boost reach' },
    fields: [
      { type: 'inp', key: 'content', label: { ar: 'موضوع المحتوى', en: 'Content Topic' }, ph: { ar: 'عم منشورك؟', en: 'What is your post about?' } },
      { type: 'select', key: 'platform', label: { ar: 'المنصة', en: 'Platform' }, opts: ['Instagram', 'TikTok', 'Twitter', 'LinkedIn', 'YouTube'] },
      { type: 'chips', key: 'mix', label: { ar: 'المزيج', en: 'Mix' }, opts: [{ ar: 'متوازن', en: 'Balanced' }, { ar: 'نيش', en: 'Niche' }, { ar: 'فيروسي', en: 'Viral' }, { ar: 'عربي', en: 'Arabic' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `خبير هاشتاقات. ولّد 30 هاشتاق لـ "${f.content}" على ${f.platform}. المزيج: ${f.mix || 'متوازن'}. 10 كبيرة+10 متوسطة+10 نيش. قيّم كل مجموعة.`
      : `Hashtag expert. Generate 30 hashtags for "${f.content}" on ${f.platform}. Mix: ${f.mix || 'balanced'}. 10 large+10 medium+10 niche. Rate each group.`
  },
  {
    id: 'caption_ig',
    emoji: '✍️',
    color: 'v-pink',
    cat: { ar: 'سوشيال', en: 'Social' },
    badge: { ar: 'AI كابشن', en: 'AI Caption' },
    name: { ar: 'كابشن إنستغرام AI', en: 'Instagram AI Caption' },
    desc: { ar: 'كابشن احترافي جاهز للنشر مع هاشتاقات', en: 'Ready-to-post caption with hashtags' },
    fields: [
      { type: 'select', key: 'niche', label: { ar: 'مجالك', en: 'Your Niche' }, opts: [{ ar: 'لياقة', en: 'Fitness' }, { ar: 'طعام', en: 'Food' }, { ar: 'سفر', en: 'Travel' }, { ar: 'موضة', en: 'Fashion' }, { ar: 'تقنية', en: 'Tech' }, { ar: 'أعمال', en: 'Business' }, { ar: 'جمال', en: 'Beauty' }, { ar: 'تعليم', en: 'Education' }] },
      { type: 'ta', key: 'post_idea', rows: 2, label: { ar: 'فكرة المنشور', en: 'Post Idea' }, ph: { ar: 'عم سيكون المنشور؟ صورة، ريلز، كاروسيل؟', en: 'What is the post about? Photo, reel, carousel?' } },
      { type: 'chips', key: 'vibe', label: { ar: 'المزاج', en: 'Vibe' }, opts: [{ ar: 'ملهم', en: 'Inspiring' }, { ar: 'مضحك', en: 'Funny' }, { ar: 'تعليمي', en: 'Educational' }, { ar: 'عاطفي', en: 'Emotional' }, { ar: 'مباشر', en: 'Direct' }] }
    ],
    prompt: (f, l) => l === 'ar'
      ? `أنت خبير سوشيال ميديا متخصص في إنستغرام. اكتب كابشن احترافي جاهز للنشر لحساب ${f.niche || 'عام'} عن "${f.post_idea}". المزاج: ${f.vibe || 'ملهم'}.\n\nالمطلوب:\n1. كابشن كامل مع إيموجي مناسبة\n2. CTA قوي في النهاية\n3. 15 هاشتاق مقسمة: 5 كبيرة + 5 متوسطة + 5 نيش\n\nاجعله جاهزاً للنسخ واللصق مباشرة.`
      : `Instagram social media expert. Write a ready-to-post caption for ${f.niche || 'general'} account about "${f.post_idea}". Vibe: ${f.vibe || 'inspiring'}.\n\nRequired:\n1. Full caption with emojis\n2. Strong CTA at end\n3. 15 hashtags: 5 large + 5 medium + 5 niche\n\nMake it copy-paste ready.`
  }
]

export const CATEGORIES = {
  ar: ['الكل', 'محتوى', 'تسويق', 'سوشيال', 'فيديو', 'SEO', 'أعمال', 'براندينج', 'ذكاء اصطناعي'],
  en: ['All', 'Content', 'Marketing', 'Social', 'Video', 'SEO', 'Business', 'Branding', 'AI']
}

export const HASHTAG_DB: Record<string, { t: string; s: 'mega' | 'large' | 'med' | 'niche'; c: string }[]> = {
  fitness: [
    { t: '#fitness', s: 'mega', c: '500M+' },
    { t: '#workout', s: 'mega', c: '300M+' },
    { t: '#gym', s: 'mega', c: '200M+' },
    { t: '#لياقة', s: 'large', c: '80M+' },
    { t: '#تمارين', s: 'med', c: '30M+' },
    { t: '#gymlife', s: 'large', c: '90M+' },
    { t: '#fitnessmotivation', s: 'niche', c: '15M+' }
  ],
  food: [
    { t: '#food', s: 'mega', c: '400M+' },
    { t: '#foodie', s: 'mega', c: '200M+' },
    { t: '#طعام', s: 'large', c: '60M+' },
    { t: '#مطاعم', s: 'large', c: '40M+' },
    { t: '#yummy', s: 'med', c: '70M+' },
    { t: '#وصفات', s: 'med', c: '25M+' }
  ],
  travel: [
    { t: '#travel', s: 'mega', c: '600M+' },
    { t: '#سفر', s: 'large', c: '70M+' },
    { t: '#wanderlust', s: 'large', c: '100M+' },
    { t: '#explore', s: 'large', c: '200M+' },
    { t: '#سياحة', s: 'med', c: '35M+' }
  ],
  fashion: [
    { t: '#fashion', s: 'mega', c: '800M+' },
    { t: '#style', s: 'mega', c: '500M+' },
    { t: '#ootd', s: 'large', c: '300M+' },
    { t: '#موضة', s: 'large', c: '50M+' },
    { t: '#styleinspo', s: 'niche', c: '5M+' }
  ],
  business: [
    { t: '#business', s: 'mega', c: '400M+' },
    { t: '#entrepreneur', s: 'large', c: '150M+' },
    { t: '#أعمال', s: 'large', c: '45M+' },
    { t: '#success', s: 'mega', c: '300M+' },
    { t: '#ريادة', s: 'med', c: '15M+' }
  ],
  beauty: [
    { t: '#beauty', s: 'mega', c: '700M+' },
    { t: '#makeup', s: 'mega', c: '400M+' },
    { t: '#skincare', s: 'large', c: '200M+' },
    { t: '#جمال', s: 'large', c: '55M+' },
    { t: '#glow', s: 'med', c: '80M+' }
  ]
}

export const NAV_ITEMS = [
  { id: 'home', icon: '🏠', label: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'ai', icon: '✨', label: { ar: 'أدوات AI', en: 'AI Tools' }, badge: '16' },
  { id: 'insta', icon: '📱', label: { ar: 'محاكي النمو', en: 'Growth Sim' } },
  { id: 'hash', icon: '🔍', label: { ar: 'الهاشتاقات', en: 'Hashtags' } },
  { id: 'money', icon: '💰', label: { ar: 'مسارات الربح', en: 'Revenue' } },
  { id: 'cal', icon: '📅', label: { ar: 'جدول النشر', en: 'Calendar' } },
]

export const TRANSLATIONS = {
  ar: {
    appName: 'AI Growth Pro',
    tagline: 'منصة نمو الأعمال',
    live: 'مباشر',
    followers: 'المتابعون',
    engagement: 'التفاعل',
    aiTools: 'أدوات AI',
    monthlyRevenue: 'أرباح شهرية',
    aboveAverage: 'فوق المتوسط',
    allAvailable: 'جميعها متاحة',
    potential: 'إمكانية',
    featuredTools: 'أدوات AI المميزة',
    expertTips: 'نصائح الخبراء',
    accountScore: 'نقاط حسابك',
    growthChart: 'تطور النمو',
    contentQuality: 'جودة المحتوى',
    consistency: 'الاتساق',
    generate: 'توليد',
    copy: 'نسخ',
    regenerate: 'إعادة التوليد',
    result: 'النتيجة',
    generating: 'جاري التوليد...',
    copied: 'تم النسخ!',
    monthlyGrowth: 'نمو شهري',
    after6Months: 'بعد 6 أشهر',
    engagementRate: 'معدل التفاعل',
    potentialRevenue: 'أرباح محتملة',
    performanceScore: 'نقاط الأداء',
    runSimulation: 'تشغيل المحاكاة',
    week: 'أسبوع',
    reels: 'ريلز',
    postsPerWeek: 'منشورات/أسبوع',
    reelsRatio: 'نسبة الريلز',
    dailyEngagement: 'تفاعل يومي',
  },
  en: {
    appName: 'AI Growth Pro',
    tagline: 'Business Growth Platform',
    live: 'Live',
    followers: 'Followers',
    engagement: 'Engagement',
    aiTools: 'AI Tools',
    monthlyRevenue: 'Monthly Revenue',
    aboveAverage: 'Above Average',
    allAvailable: 'All Available',
    potential: 'Potential',
    featuredTools: 'Featured AI Tools',
    expertTips: 'Expert Tips',
    accountScore: 'Account Score',
    growthChart: 'Growth Chart',
    contentQuality: 'Content Quality',
    consistency: 'Consistency',
    generate: 'Generate',
    copy: 'Copy',
    regenerate: 'Regenerate',
    result: 'Result',
    generating: 'Generating...',
    copied: 'Copied!',
    monthlyGrowth: 'Monthly Growth',
    after6Months: 'After 6 Months',
    engagementRate: 'Engagement Rate',
    potentialRevenue: 'Potential Revenue',
    performanceScore: 'Performance Score',
    runSimulation: 'Run Simulation',
    week: 'week',
    reels: 'Reels',
    postsPerWeek: 'Posts/Week',
    reelsRatio: 'Reels Ratio',
    dailyEngagement: 'Daily Engagement',
  }
}
