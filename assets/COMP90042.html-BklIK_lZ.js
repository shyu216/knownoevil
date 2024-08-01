import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as l,f as n}from"./app-C4722Gpd.js";const a={},t=n('<h2 id="_1-preprocessing" tabindex="-1"><a class="header-anchor" href="#_1-preprocessing"><span>1. Preprocessing</span></a></h2><ul><li>Sentence segmentation</li><li>Tokenization, subword tokenization</li><li>Word normalization <ul><li>Inflectional vs derivational morphology</li><li>Lemmatization vs stemming</li></ul></li><li>Stopword removal</li></ul><h2 id="_2-n-gram-language-model" tabindex="-1"><a class="header-anchor" href="#_2-n-gram-language-model"><span>2. N-gram Language Model</span></a></h2><ul><li>Derivation</li><li>Smoothing techniques <ul><li>Add-k</li><li>Absolute discounting</li><li>Katz backoff</li><li>Kneser-Ney smoothing</li><li>Interpolation</li></ul></li></ul><h2 id="_3-text-classification" tabindex="-1"><a class="header-anchor" href="#_3-text-classification"><span>3. Text Classification</span></a></h2><ul><li>Build a classifier</li><li>Task <ul><li>Topic classification</li><li>Sentiment analysis</li><li>Native language identification</li></ul></li><li>Algorithms <ul><li>Naive Bayes, logistic regression, SVM</li><li>kNN, neural networks</li></ul></li><li>Bias vs variance：欠拟合under和过拟合over的取舍</li><li>Evaluation <ul><li>Precision, recall, F1</li></ul></li></ul><h2 id="_4-part-of-speech-tagging" tabindex="-1"><a class="header-anchor" href="#_4-part-of-speech-tagging"><span>4. Part of Speech Tagging</span></a></h2><ul><li>English POS <ul><li>Closed vs open classes</li></ul></li><li>Tagsets <ul><li>Penn Treebank tagset</li></ul></li><li>Automatic taggers <ul><li>Rule-based</li><li>Statistical <ul><li>Unigram, classifier-based, HMM</li></ul></li></ul></li></ul><h2 id="_5-hidden-markov-model" tabindex="-1"><a class="header-anchor" href="#_5-hidden-markov-model"><span>5. Hidden Markov Model</span></a></h2><ul><li>Probabilistic formulation: <ul><li>Emission &amp; Transition</li></ul></li><li>Training</li><li>Viterbi algorithm</li><li>Generative vs discriminative models</li></ul><h2 id="_6-feedforward-neural-network" tabindex="-1"><a class="header-anchor" href="#_6-feedforward-neural-network"><span>6. Feedforward Neural Network</span></a></h2><ul><li>Formulation</li><li>Tasks: <ul><li>Topic classifcation</li><li>Language models</li><li>POS tagging</li></ul></li><li>Word embeddings</li><li>Convolutional networks</li></ul><h2 id="_7-recurrent-neural-network" tabindex="-1"><a class="header-anchor" href="#_7-recurrent-neural-network"><span>7. Recurrent Neural Network</span></a></h2><ul><li>Formulation</li><li>RNN: language models</li><li>LSTM: <ul><li>Functions of gates</li><li>Variants</li></ul></li><li>Tasks: <ul><li>Text classification: sentiment analysis</li><li>POS tagging</li></ul></li></ul><h2 id="_8-lexical-semantics" tabindex="-1"><a class="header-anchor" href="#_8-lexical-semantics"><span>8. Lexical Semantics</span></a></h2><ul><li>Definition of word sense, gloss</li><li>Lexical Relationship: <ul><li>Synonymy, antonymy, hypernymy, meronymy</li></ul></li><li>Structure of wordnet</li><li>Word similarity <ul><li>Path lenght</li><li>Depth information</li><li>Information content</li></ul></li><li>Word sense unambiguation <ul><li>supervised, unsupervised</li></ul></li></ul><h2 id="_9-distributional-semantics" tabindex="-1"><a class="header-anchor" href="#_9-distributional-semantics"><span>9. Distributional Semantics</span></a></h2><ul><li>Matrices: <ul><li>VSM, TF-IDF, word-word co-occurrence</li></ul></li><li>Association measures: PMI, PPMI</li><li>Count-based method: SVM</li><li>Neural method: skip-gram, CBOW</li><li>Evaluation: <ul><li>Word similarity, analogy</li></ul></li></ul><h2 id="_10-contextual-representation" tabindex="-1"><a class="header-anchor" href="#_10-contextual-representation"><span>10. Contextual Representation</span></a></h2><ul><li>Formulation with RNN</li><li>ELMo</li><li>BERT <ul><li>Objective</li><li>Fine-tuning for downstream tasks</li></ul></li><li>Transformers <ul><li>Multi-head attention</li></ul></li></ul><h2 id="_11-attention" tabindex="-1"><a class="header-anchor" href="#_11-attention"><span>11. Attention</span></a></h2><ul><li>Sequential model with attention</li><li>Attention variants: <ul><li>Concat</li><li>Dot product</li><li>Scaled dot product</li><li>Location-based</li><li>Cosine similarity</li></ul></li><li>Global vs local attention</li><li>Self-attention</li></ul><h2 id="_12-machine-translation" tabindex="-1"><a class="header-anchor" href="#_12-machine-translation"><span>12. Machine Translation</span></a></h2><ul><li>Statistical MT</li><li>Neural MT with teacher forcing</li></ul><h2 id="_13-transformer" tabindex="-1"><a class="header-anchor" href="#_13-transformer"><span>13. Transformer</span></a></h2><ul><li>Mutli-head self-attention</li><li>Position encoding</li></ul><h2 id="_14-pretrained-language-models" tabindex="-1"><a class="header-anchor" href="#_14-pretrained-language-models"><span>14. Pretrained Language Models</span></a></h2><ul><li>Encoder architecture <ul><li>BERT</li><li>bidirectional context</li><li>good for classification</li></ul></li><li>Encoder-decoder architecture</li><li>Decoder architecture <ul><li>GPT</li><li>unidirectional context</li><li>good for generation</li></ul></li></ul><h2 id="_15-large-language-models" tabindex="-1"><a class="header-anchor" href="#_15-large-language-models"><span>15. Large Language Models</span></a></h2><ul><li>In-context learning</li><li>Step-by-step reasoning</li><li>Human-feedback reinforcement</li><li>Instruction following</li></ul><h2 id="_16-named-entity-recognition" tabindex="-1"><a class="header-anchor" href="#_16-named-entity-recognition"><span>16. Named Entity Recognition</span></a></h2><ul><li>Predict entities in a text</li><li>Traditional ML methods</li><li>Bi-LSTM with another RNN/CRF</li><li>Multi-aspect NER</li></ul><h2 id="_17-coreference-resolution-共指消解" tabindex="-1"><a class="header-anchor" href="#_17-coreference-resolution-共指消解"><span>17. Coreference Resolution 共指消解</span></a></h2><ul><li>Coreference, anaphora</li><li>B-Cubed metric</li></ul><h2 id="_18-question-answering-and-reading-comprehension" tabindex="-1"><a class="header-anchor" href="#_18-question-answering-and-reading-comprehension"><span>18. Question Answering and Reading Comprehension</span></a></h2><ul><li>Knowledge-based QA</li><li>Visual QA</li></ul><h2 id="_19-spoken-language-understanding" tabindex="-1"><a class="header-anchor" href="#_19-spoken-language-understanding"><span>19. Spoken Language Understanding</span></a></h2><ul><li>Attention RNNs</li><li>Joint BERT</li><li>Tri-level model</li><li>Explainable NLU</li></ul><h2 id="_20-vision-language-pretrained-model" tabindex="-1"><a class="header-anchor" href="#_20-vision-language-pretrained-model"><span>20. Vision Language Pretrained Model</span></a></h2><ul><li>V-L Interaction Model <ul><li>Self-attention, co-attention, VSE</li></ul></li><li>Constrastive Language-Image Pretraining</li></ul><h2 id="_21-ethics" tabindex="-1"><a class="header-anchor" href="#_21-ethics"><span>21. Ethics</span></a></h2><ul><li>Sotial bias 刻板印象</li><li>Incivility 仇恨言论</li><li>Privacy Violation 歧视</li><li>Misinformation 谣言</li><li>Technological divide 发展不平衡</li></ul>',42),r=[t];function o(s,c){return l(),i("div",null,r)}const g=e(a,[["render",o],["__file","COMP90042.html.vue"]]),h=JSON.parse('{"path":"/master/COMP90042.html","title":"COMP90042 Natural Language Processing","lang":"en-US","frontmatter":{"title":"COMP90042 Natural Language Processing","shortTitle":"COMP90042","icon":"book-open","category":["UniMelb","24S1"],"tag":["Artificial Intelligence","Machine Learning","Deep Learning","Natural Language Processing"],"description":"1. Preprocessing Sentence segmentation Tokenization, subword tokenization Word normalization Inflectional vs derivational morphology Lemmatization vs stemming Stopword removal 2...","head":[["meta",{"property":"og:url","content":"https://shyu216.github.io/knownoevil/knownoevil/master/COMP90042.html"}],["meta",{"property":"og:site_name","content":"Know No Evil"}],["meta",{"property":"og:title","content":"COMP90042 Natural Language Processing"}],["meta",{"property":"og:description","content":"1. Preprocessing Sentence segmentation Tokenization, subword tokenization Word normalization Inflectional vs derivational morphology Lemmatization vs stemming Stopword removal 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-08-01T11:19:32.000Z"}],["meta",{"property":"article:author","content":"Dale"}],["meta",{"property":"article:tag","content":"Artificial Intelligence"}],["meta",{"property":"article:tag","content":"Machine Learning"}],["meta",{"property":"article:tag","content":"Deep Learning"}],["meta",{"property":"article:tag","content":"Natural Language Processing"}],["meta",{"property":"article:modified_time","content":"2024-08-01T11:19:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"COMP90042 Natural Language Processing\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-01T11:19:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Dale\\",\\"url\\":\\"https://github.com/shyu216\\"}]}"]]},"headers":[{"level":2,"title":"1. Preprocessing","slug":"_1-preprocessing","link":"#_1-preprocessing","children":[]},{"level":2,"title":"2. N-gram Language Model","slug":"_2-n-gram-language-model","link":"#_2-n-gram-language-model","children":[]},{"level":2,"title":"3. Text Classification","slug":"_3-text-classification","link":"#_3-text-classification","children":[]},{"level":2,"title":"4. Part of Speech Tagging","slug":"_4-part-of-speech-tagging","link":"#_4-part-of-speech-tagging","children":[]},{"level":2,"title":"5. Hidden Markov Model","slug":"_5-hidden-markov-model","link":"#_5-hidden-markov-model","children":[]},{"level":2,"title":"6. Feedforward Neural Network","slug":"_6-feedforward-neural-network","link":"#_6-feedforward-neural-network","children":[]},{"level":2,"title":"7. Recurrent Neural Network","slug":"_7-recurrent-neural-network","link":"#_7-recurrent-neural-network","children":[]},{"level":2,"title":"8. Lexical Semantics","slug":"_8-lexical-semantics","link":"#_8-lexical-semantics","children":[]},{"level":2,"title":"9. Distributional Semantics","slug":"_9-distributional-semantics","link":"#_9-distributional-semantics","children":[]},{"level":2,"title":"10. Contextual Representation","slug":"_10-contextual-representation","link":"#_10-contextual-representation","children":[]},{"level":2,"title":"11. Attention","slug":"_11-attention","link":"#_11-attention","children":[]},{"level":2,"title":"12. Machine Translation","slug":"_12-machine-translation","link":"#_12-machine-translation","children":[]},{"level":2,"title":"13. Transformer","slug":"_13-transformer","link":"#_13-transformer","children":[]},{"level":2,"title":"14. Pretrained Language Models","slug":"_14-pretrained-language-models","link":"#_14-pretrained-language-models","children":[]},{"level":2,"title":"15. Large Language Models","slug":"_15-large-language-models","link":"#_15-large-language-models","children":[]},{"level":2,"title":"16. Named Entity Recognition","slug":"_16-named-entity-recognition","link":"#_16-named-entity-recognition","children":[]},{"level":2,"title":"17. Coreference Resolution 共指消解","slug":"_17-coreference-resolution-共指消解","link":"#_17-coreference-resolution-共指消解","children":[]},{"level":2,"title":"18. Question Answering and Reading Comprehension","slug":"_18-question-answering-and-reading-comprehension","link":"#_18-question-answering-and-reading-comprehension","children":[]},{"level":2,"title":"19. Spoken Language Understanding","slug":"_19-spoken-language-understanding","link":"#_19-spoken-language-understanding","children":[]},{"level":2,"title":"20. Vision Language Pretrained Model","slug":"_20-vision-language-pretrained-model","link":"#_20-vision-language-pretrained-model","children":[]},{"level":2,"title":"21. Ethics","slug":"_21-ethics","link":"#_21-ethics","children":[]}],"git":{"createdTime":1722491295000,"updatedTime":1722511172000,"contributors":[{"name":"shyu216","email":"sihong1@student.unimelb.edu.au","commits":2}]},"readingTime":{"minutes":1.45,"words":434},"filePathRelative":"master/COMP90042.md","localizedDate":"August 1, 2024","autoDesc":true}');export{g as comp,h as data};
