/**
 * Complete Roadmap Data with YouTube Resources
 * Based on data format.docx
 */

export const ROADMAPS_DATA = [
    {
        name: 'AI/ML Engineer',
        description: 'Complete roadmap to become an AI/ML Engineer with hands-on projects',
        icon: '🤖',
        category: 'AI & Data Science',
        difficulty: 'advanced',
        estimated_hours: 450,
        phases: [
            {
                phase_number: 1,
                title: 'Programming & CS Foundations',
                description: 'Build strong programming fundamentals',
                nodes: [
                    {
                        title: 'Python Basics',
                        description: 'Learn Python syntax, data types, control flow, and functions',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Python Full Course for Beginners', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', duration_minutes: 270, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Python Tutorial - Python for Beginners', url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', duration_minutes: 360, provider: 'Programming with Mosh' },
                            { type: 'practice', title: 'Python Exercises', url: 'https://www.w3schools.com/python/python_exercises.asp', duration_minutes: null, provider: 'W3Schools' }
                        ]
                    },
                    {
                        title: 'Python OOP',
                        description: 'Object-Oriented Programming concepts in Python',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Python OOP Tutorial', url: 'https://www.youtube.com/watch?v=Ej_02ICOIgs', duration_minutes: 60, provider: 'Tech With Tim' },
                            { type: 'video', title: 'Object Oriented Programming with Python', url: 'https://www.youtube.com/watch?v=JeznW_7DlB0', duration_minutes: 90, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Data Structures in Python',
                        description: 'Lists, dictionaries, sets, tuples, and their operations',
                        estimated_hours: 18,
                        resources: [
                            { type: 'video', title: 'Data Structures and Algorithms in Python', url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', duration_minutes: 780, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Python Data Structures', url: 'https://www.youtube.com/watch?v=R-HLU9Fl5ug', duration_minutes: 45, provider: 'Corey Schafer' }
                        ]
                    },
                    {
                        title: 'Algorithms Basics',
                        description: 'Sorting, searching, and algorithm complexity',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Algorithms Course - Graph Theory Tutorial', url: 'https://www.youtube.com/watch?v=09_LlHjoEiY', duration_minutes: 480, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Introduction to Algorithms', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME', duration_minutes: 120, provider: 'Abdul Bari' }
                        ]
                    },
                    {
                        title: 'Git & Version Control',
                        description: 'Version control with Git and GitHub',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Git and GitHub for Beginners', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', duration_minutes: 70, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Git Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=8JJ101D3knE', duration_minutes: 60, provider: 'Programming with Mosh' }
                        ]
                    },
                    {
                        title: 'Command Line Basics',
                        description: 'Terminal navigation and basic commands',
                        estimated_hours: 5,
                        resources: [
                            { type: 'video', title: 'Command Line Crash Course', url: 'https://www.youtube.com/watch?v=yz7nYlnXLfE', duration_minutes: 35, provider: 'Traversy Media' },
                            { type: 'video', title: 'Linux Command Line Full Course', url: 'https://www.youtube.com/watch?v=2PGnYjbYuUo', duration_minutes: 120, provider: 'freeCodeCamp' }
                        ]
                    }
                ]
            },
            {
                phase_number: 2,
                title: 'Mathematics for ML',
                description: 'Essential math concepts for machine learning',
                nodes: [
                    {
                        title: 'Linear Algebra Basics',
                        description: 'Vectors, matrices, and linear transformations',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'Linear Algebra - Full College Course', url: 'https://www.youtube.com/watch?v=JnTa9XtvmfI', duration_minutes: 540, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Essence of Linear Algebra', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', duration_minutes: 180, provider: '3Blue1Brown' }
                        ]
                    },
                    {
                        title: 'Probability Fundamentals',
                        description: 'Probability theory and random variables',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Probability Course', url: 'https://www.youtube.com/watch?v=1uW3qMFA9Ho', duration_minutes: 480, provider: 'Khan Academy' },
                            { type: 'video', title: 'Statistics and Probability Full Course', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration_minutes: 480, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Statistics Fundamentals',
                        description: 'Descriptive and inferential statistics',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Statistics Full Course', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration_minutes: 480, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Statistics - A Full University Course', url: 'https://www.youtube.com/watch?v=qBigTkBLU6g', duration_minutes: 510, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Calculus Basics',
                        description: 'Derivatives, integrals, and optimization',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'Calculus 1 - Full College Course', url: 'https://www.youtube.com/watch?v=HfACrKJ_Y2w', duration_minutes: 720, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Essence of Calculus', url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM', duration_minutes: 195, provider: '3Blue1Brown' }
                        ]
                    }
                ]
            },
            {
                phase_number: 3,
                title: 'Data Handling',
                description: 'Master data manipulation and preprocessing',
                nodes: [
                    {
                        title: 'NumPy',
                        description: 'Numerical computing with NumPy arrays',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'NumPy Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', duration_minutes: 58, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Complete NumPy Tutorial', url: 'https://www.youtube.com/watch?v=8Y0qQEh7dJg', duration_minutes: 120, provider: 'Keith Galli' }
                        ]
                    },
                    {
                        title: 'Pandas',
                        description: 'Data manipulation with Pandas DataFrames',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Pandas Tutorial - Complete Python Pandas', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration_minutes: 60, provider: 'Keith Galli' },
                            { type: 'video', title: 'Python Pandas Tutorial', url: 'https://www.youtube.com/watch?v=ZyhVh-qRZPA', duration_minutes: 120, provider: 'Corey Schafer' }
                        ]
                    },
                    {
                        title: 'Data Cleaning',
                        description: 'Handle missing data, outliers, and inconsistencies',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Data Cleaning in Python', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', duration_minutes: 45, provider: 'Alex The Analyst' },
                            { type: 'video', title: 'Data Cleaning Tutorial', url: 'https://www.youtube.com/watch?v=R67XuYc9NQ4', duration_minutes: 60, provider: 'Keith Galli' }
                        ]
                    },
                    {
                        title: 'Feature Engineering',
                        description: 'Create and transform features for ML models',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Feature Engineering for Machine Learning', url: 'https://www.youtube.com/watch?v=6WDFfaYtN6s', duration_minutes: 90, provider: 'Krish Naik' },
                            { type: 'video', title: 'Feature Engineering Techniques', url: 'https://www.youtube.com/watch?v=0HOqOcln3Z4', duration_minutes: 75, provider: 'Data Science Dojo' }
                        ]
                    }
                ]
            },
            {
                phase_number: 4,
                title: 'Machine Learning Core',
                description: 'Fundamental ML concepts and techniques',
                nodes: [
                    {
                        title: 'Supervised Learning',
                        description: 'Learn from labeled data',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Machine Learning Course - Supervised Learning', url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU', duration_minutes: 600, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Supervised Learning Explained', url: 'https://www.youtube.com/watch?v=4qVRBYAdLAo', duration_minutes: 45, provider: 'StatQuest' }
                        ]
                    },
                    {
                        title: 'Unsupervised Learning',
                        description: 'Find patterns in unlabeled data',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Unsupervised Learning Tutorial', url: 'https://www.youtube.com/watch?v=IUn8k5zSI6g', duration_minutes: 60, provider: 'Simplilearn' },
                            { type: 'video', title: 'Clustering Algorithms', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', duration_minutes: 90, provider: 'StatQuest' }
                        ]
                    },
                    {
                        title: 'Model Evaluation',
                        description: 'Metrics, cross-validation, and model selection',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Model Evaluation Metrics', url: 'https://www.youtube.com/watch?v=LbX4X71-TFI', duration_minutes: 45, provider: 'Krish Naik' },
                            { type: 'video', title: 'Cross Validation Explained', url: 'https://www.youtube.com/watch?v=fSytzGwwBVw', duration_minutes: 30, provider: 'StatQuest' }
                        ]
                    },
                    {
                        title: 'Bias vs Variance',
                        description: 'Understanding model complexity trade-offs',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Bias and Variance', url: 'https://www.youtube.com/watch?v=EuBBz3bI-aA', duration_minutes: 20, provider: 'StatQuest' },
                            { type: 'video', title: 'Overfitting and Underfitting', url: 'https://www.youtube.com/watch?v=BqzgUnrNhFM', duration_minutes: 25, provider: 'Krish Naik' }
                        ]
                    }
                ]
            },
            {
                phase_number: 5,
                title: 'ML Algorithms',
                description: 'Master key machine learning algorithms',
                nodes: [
                    {
                        title: 'Linear Regression',
                        description: 'Predict continuous values',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Linear Regression - StatQuest', url: 'https://www.youtube.com/watch?v=nk2CQITm_eo', duration_minutes: 27, provider: 'StatQuest' },
                            { type: 'video', title: 'Linear Regression in Python', url: 'https://www.youtube.com/watch?v=VmbA0pi2cRQ', duration_minutes: 45, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Logistic Regression',
                        description: 'Binary and multiclass classification',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Logistic Regression - StatQuest', url: 'https://www.youtube.com/watch?v=yIYKR4sgzI8', duration_minutes: 19, provider: 'StatQuest' },
                            { type: 'video', title: 'Logistic Regression in Python', url: 'https://www.youtube.com/watch?v=VCJdg7YBbAQ', duration_minutes: 50, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Decision Trees',
                        description: 'Tree-based classification and regression',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Decision Trees - StatQuest', url: 'https://www.youtube.com/watch?v=7VeUPuFGJHk', duration_minutes: 17, provider: 'StatQuest' },
                            { type: 'video', title: 'Decision Tree Classification', url: 'https://www.youtube.com/watch?v=RmajweUFKvM', duration_minutes: 60, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Random Forest',
                        description: 'Ensemble learning with decision trees',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Random Forests - StatQuest', url: 'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ', duration_minutes: 10, provider: 'StatQuest' },
                            { type: 'video', title: 'Random Forest in Python', url: 'https://www.youtube.com/watch?v=ok2s1vV9XW0', duration_minutes: 45, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Support Vector Machines',
                        description: 'Maximum margin classification',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Support Vector Machines - StatQuest', url: 'https://www.youtube.com/watch?v=efR1C6CvhmE', duration_minutes: 20, provider: 'StatQuest' },
                            { type: 'video', title: 'SVM in Python', url: 'https://www.youtube.com/watch?v=TtKF996oEl8', duration_minutes: 55, provider: 'Krish Naik' }
                        ]
                    }
                ]
            },
            {
                phase_number: 6,
                title: 'Deep Learning',
                description: 'Neural networks and deep learning frameworks',
                nodes: [
                    {
                        title: 'Neural Networks Basics',
                        description: 'Perceptrons, activation functions, and architectures',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Neural Networks Explained', url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration_minutes: 19, provider: '3Blue1Brown' },
                            { type: 'video', title: 'Deep Learning Crash Course', url: 'https://www.youtube.com/watch?v=VyWAvY2CF9c', duration_minutes: 90, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'TensorFlow / PyTorch',
                        description: 'Deep learning frameworks',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'PyTorch for Deep Learning', url: 'https://www.youtube.com/watch?v=V_xro1bcAuA', duration_minutes: 600, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'TensorFlow 2.0 Complete Course', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk', duration_minutes: 420, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'CNN',
                        description: 'Convolutional Neural Networks for computer vision',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'CNN Explained', url: 'https://www.youtube.com/watch?v=YRhxdVk_sIs', duration_minutes: 25, provider: 'Computerphile' },
                            { type: 'video', title: 'CNN from Scratch in Python', url: 'https://www.youtube.com/watch?v=pj9-rr1wDhM', duration_minutes: 90, provider: 'Aladdin Persson' }
                        ]
                    },
                    {
                        title: 'RNN',
                        description: 'Recurrent Neural Networks for sequences',
                        estimated_hours: 18,
                        resources: [
                            { type: 'video', title: 'RNN and LSTM Explained', url: 'https://www.youtube.com/watch?v=WCUNPb-5EYI', duration_minutes: 30, provider: 'StatQuest' },
                            { type: 'video', title: 'RNN Tutorial', url: 'https://www.youtube.com/watch?v=AsNTP8Kwu80', duration_minutes: 75, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Transformers',
                        description: 'Attention mechanisms and transformer architecture',
                        estimated_hours: 22,
                        resources: [
                            { type: 'video', title: 'Attention is All You Need', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro', duration_minutes: 45, provider: 'Yannic Kilcher' },
                            { type: 'video', title: 'Transformers Explained', url: 'https://www.youtube.com/watch?v=4Bdc55j80l8', duration_minutes: 60, provider: 'CodeEmporium' }
                        ]
                    }
                ]
            },
            {
                phase_number: 7,
                title: 'Deployment & MLOps',
                description: 'Deploy and maintain ML models in production',
                nodes: [
                    {
                        title: 'Model Serialization',
                        description: 'Save and load trained models',
                        estimated_hours: 5,
                        resources: [
                            { type: 'video', title: 'Model Deployment Tutorial', url: 'https://www.youtube.com/watch?v=mrExsjcvF4o', duration_minutes: 45, provider: 'Krish Naik' },
                            { type: 'video', title: 'Pickle and Joblib', url: 'https://www.youtube.com/watch?v=KfnhNlD8WZI', duration_minutes: 30, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'FastAPI / Flask',
                        description: 'Build REST APIs for ML models',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'FastAPI Tutorial', url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA', duration_minutes: 120, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Flask Tutorial', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA', duration_minutes: 360, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Docker for ML',
                        description: 'Containerize ML applications',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Docker Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', duration_minutes: 180, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Docker for Data Science', url: 'https://www.youtube.com/watch?v=0qG_0CPQhpg', duration_minutes: 90, provider: 'Krish Naik' }
                        ]
                    },
                    {
                        title: 'Model Monitoring',
                        description: 'Track model performance in production',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'MLOps Tutorial', url: 'https://www.youtube.com/watch?v=Nw1EYq3IDCU', duration_minutes: 120, provider: 'Krish Naik' },
                            { type: 'video', title: 'ML Model Monitoring', url: 'https://www.youtube.com/watch?v=QV_fhLvIzw4', duration_minutes: 60, provider: 'MLOps Community' }
                        ]
                    }
                ]
            },
            {
                phase_number: 8,
                title: 'Projects',
                description: 'Build real-world ML projects',
                nodes: [
                    {
                        title: 'Image Classification Project',
                        description: 'Build an end-to-end image classifier',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Image Classification with CNN', url: 'https://www.youtube.com/watch?v=jztwpsIzEGc', duration_minutes: 90, provider: 'Krish Naik' },
                            { type: 'video', title: 'Deep Learning Project', url: 'https://www.youtube.com/watch?v=tPYj3fFJGjk', duration_minutes: 120, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'NLP Project',
                        description: 'Text classification or sentiment analysis',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'NLP Project Tutorial', url: 'https://www.youtube.com/watch?v=fM4qTMfCoak', duration_minutes: 150, provider: 'Krish Naik' },
                            { type: 'video', title: 'Sentiment Analysis Project', url: 'https://www.youtube.com/watch?v=QpzMWQvxXWk', duration_minutes: 90, provider: 'Nicholas Renotte' }
                        ]
                    },
                    {
                        title: 'End-to-End ML Project',
                        description: 'Complete ML pipeline from data to deployment',
                        estimated_hours: 30,
                        resources: [
                            { type: 'video', title: 'End to End ML Project', url: 'https://www.youtube.com/watch?v=Rv6UFGNmNZg', duration_minutes: 240, provider: 'Krish Naik' },
                            { type: 'video', title: 'ML Project Deployment', url: 'https://www.youtube.com/watch?v=xl0N7tHiwlw', duration_minutes: 180, provider: 'Krish Naik' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Backend Developer',
        description: 'Build scalable server-side applications and APIs',
        icon: '⚙️',
        category: 'Web Development',
        difficulty: 'intermediate',
        estimated_hours: 320,
        phases: [
            {
                phase_number: 1,
                title: 'Foundations',
                description: 'Programming and web fundamentals',
                nodes: [
                    {
                        title: 'JavaScript Basics',
                        description: 'Core JavaScript concepts and ES6+',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration_minutes: 480, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Modern JavaScript', url: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc', duration_minutes: 120, provider: 'Traversy Media' }
                        ]
                    },
                    {
                        title: 'Advanced JavaScript',
                        description: 'Closures, promises, async/await, and more',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Advanced JavaScript Concepts', url: 'https://www.youtube.com/watch?v=R9I85RhI7Cg', duration_minutes: 180, provider: 'Traversy Media' },
                            { type: 'video', title: 'JavaScript Pro Concepts', url: 'https://www.youtube.com/watch?v=Mus_vwhTCq0', duration_minutes: 240, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Git & GitHub',
                        description: 'Version control and collaboration',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Git and GitHub for Beginners', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', duration_minutes: 70, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Git Tutorial', url: 'https://www.youtube.com/watch?v=8JJ101D3knE', duration_minutes: 60, provider: 'Programming with Mosh' }
                        ]
                    },
                    {
                        title: 'Internet & HTTP',
                        description: 'How the web works',
                        estimated_hours: 6,
                        resources: [
                            { type: 'video', title: 'HTTP Crash Course', url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0', duration_minutes: 38, provider: 'Traversy Media' },
                            { type: 'video', title: 'How the Internet Works', url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', duration_minutes: 45, provider: 'Lesics' }
                        ]
                    }
                ]
            },
            {
                phase_number: 2,
                title: 'Node.js',
                description: 'Server-side JavaScript with Node.js',
                nodes: [
                    {
                        title: 'Node.js Fundamentals',
                        description: 'Event loop, modules, and core APIs',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Node.js Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', duration_minutes: 480, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Node.js Crash Course', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', duration_minutes: 90, provider: 'Traversy Media' }
                        ]
                    },
                    {
                        title: 'NPM',
                        description: 'Package management and dependencies',
                        estimated_hours: 5,
                        resources: [
                            { type: 'video', title: 'NPM Crash Course', url: 'https://www.youtube.com/watch?v=jHDhaSSKmB0', duration_minutes: 30, provider: 'Traversy Media' },
                            { type: 'video', title: 'NPM Tutorial', url: 'https://www.youtube.com/watch?v=P3aKRdUyr0s', duration_minutes: 45, provider: 'Codevolution' }
                        ]
                    },
                    {
                        title: 'Async Programming',
                        description: 'Callbacks, promises, and async/await',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Async JavaScript', url: 'https://www.youtube.com/watch?v=PoRJizFvM7s', duration_minutes: 60, provider: 'Traversy Media' },
                            { type: 'video', title: 'Promises and Async/Await', url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU', duration_minutes: 45, provider: 'Web Dev Simplified' }
                        ]
                    },
                    {
                        title: 'File System',
                        description: 'Working with files and directories',
                        estimated_hours: 6,
                        resources: [
                            { type: 'video', title: 'Node.js File System', url: 'https://www.youtube.com/watch?v=U57kU311-nE', duration_minutes: 30, provider: 'The Net Ninja' },
                            { type: 'video', title: 'FS Module Tutorial', url: 'https://www.youtube.com/watch?v=yQBw8skBdZU', duration_minutes: 25, provider: 'Codevolution' }
                        ]
                    }
                ]
            },
            {
                phase_number: 3,
                title: 'Express.js',
                description: 'Web framework for Node.js',
                nodes: [
                    {
                        title: 'Express Basics',
                        description: 'Routes, requests, and responses',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Express JS Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', duration_minutes: 90, provider: 'Traversy Media' },
                            { type: 'video', title: 'Express.js Tutorial', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0', duration_minutes: 120, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Middleware',
                        description: 'Request processing pipeline',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Express Middleware Explained', url: 'https://www.youtube.com/watch?v=lY6icfhap2o', duration_minutes: 30, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Middleware Tutorial', url: 'https://www.youtube.com/watch?v=9HOem0amlyg', duration_minutes: 45, provider: 'The Net Ninja' }
                        ]
                    },
                    {
                        title: 'Routing',
                        description: 'Advanced routing patterns',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Express Router', url: 'https://www.youtube.com/watch?v=iM_S4RczozU', duration_minutes: 35, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Routing in Express', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', duration_minutes: 60, provider: 'The Net Ninja' }
                        ]
                    },
                    {
                        title: 'Error Handling',
                        description: 'Error middleware and best practices',
                        estimated_hours: 7,
                        resources: [
                            { type: 'video', title: 'Error Handling in Express', url: 'https://www.youtube.com/watch?v=DyqVqaf1KnA', duration_minutes: 25, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Express Error Handling', url: 'https://www.youtube.com/watch?v=w1V2SdzdQBs', duration_minutes: 40, provider: 'Academind' }
                        ]
                    }
                ]
            },
            {
                phase_number: 4,
                title: 'APIs',
                description: 'Build RESTful APIs',
                nodes: [
                    {
                        title: 'REST API Principles',
                        description: 'REST architecture and best practices',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'REST API Tutorial', url: 'https://www.youtube.com/watch?v=-MTSQjw5DrM', duration_minutes: 45, provider: 'Traversy Media' },
                            { type: 'video', title: 'RESTful API Design', url: 'https://www.youtube.com/watch?v=0oXYLzuucwE', duration_minutes: 60, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'CRUD Operations',
                        description: 'Create, Read, Update, Delete',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Build a REST API', url: 'https://www.youtube.com/watch?v=fgTGADljAeg', duration_minutes: 90, provider: 'Traversy Media' },
                            { type: 'video', title: 'CRUD API Tutorial', url: 'https://www.youtube.com/watch?v=_7UQPve99r4', duration_minutes: 75, provider: 'Web Dev Simplified' }
                        ]
                    },
                    {
                        title: 'API Authentication',
                        description: 'Secure your APIs',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'JWT Authentication', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration_minutes: 45, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Node.js Auth Tutorial', url: 'https://www.youtube.com/watch?v=Ud5xKCYQTjM', duration_minutes: 120, provider: 'The Net Ninja' }
                        ]
                    },
                    {
                        title: 'JWT',
                        description: 'JSON Web Tokens',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'JWT Explained', url: 'https://www.youtube.com/watch?v=7Q17ubqLfaM', duration_minutes: 20, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'JWT Tutorial', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', duration_minutes: 45, provider: 'Web Dev Simplified' }
                        ]
                    }
                ]
            },
            {
                phase_number: 5,
                title: 'Databases',
                description: 'Data persistence and management',
                nodes: [
                    {
                        title: 'SQL Basics',
                        description: 'Structured Query Language fundamentals',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'SQL Tutorial - Full Course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', duration_minutes: 240, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'SQL for Beginners', url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA', duration_minutes: 180, provider: 'Programming with Mosh' }
                        ]
                    },
                    {
                        title: 'PostgreSQL',
                        description: 'Advanced relational database',
                        estimated_hours: 18,
                        resources: [
                            { type: 'video', title: 'PostgreSQL Tutorial', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', duration_minutes: 240, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'PostgreSQL Crash Course', url: 'https://www.youtube.com/watch?v=zw4s3Ey8ayo', duration_minutes: 90, provider: 'Traversy Media' }
                        ]
                    },
                    {
                        title: 'Schema Design',
                        description: 'Database modeling and normalization',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Database Design Course', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', duration_minutes: 120, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'Database Normalization', url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8', duration_minutes: 45, provider: 'Decomplexify' }
                        ]
                    },
                    {
                        title: 'ORM / Query Builder',
                        description: 'Sequelize, Prisma, or Knex',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Prisma Tutorial', url: 'https://www.youtube.com/watch?v=RebA5J-rlwg', duration_minutes: 90, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Sequelize ORM', url: 'https://www.youtube.com/watch?v=pxo7L5nd1gA', duration_minutes: 120, provider: 'Traversy Media' }
                        ]
                    }
                ]
            },
            {
                phase_number: 6,
                title: 'Auth & Security',
                description: 'Secure your applications',
                nodes: [
                    {
                        title: 'Password Hashing',
                        description: 'Bcrypt and secure password storage',
                        estimated_hours: 6,
                        resources: [
                            { type: 'video', title: 'Password Hashing with Bcrypt', url: 'https://www.youtube.com/watch?v=O6cmuiTBZVs', duration_minutes: 30, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Secure Password Storage', url: 'https://www.youtube.com/watch?v=cczlpiiu42M', duration_minutes: 25, provider: 'Fireship' }
                        ]
                    },
                    {
                        title: 'Sessions vs Tokens',
                        description: 'Authentication strategies',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Sessions vs JWT', url: 'https://www.youtube.com/watch?v=UBUNrFtufWo', duration_minutes: 20, provider: 'Web Dev Simplified' },
                            { type: 'video', title: 'Authentication Strategies', url: 'https://www.youtube.com/watch?v=F-sFp_AvHc8', duration_minutes: 45, provider: 'Fireship' }
                        ]
                    },
                    {
                        title: 'Security Best Practices',
                        description: 'OWASP Top 10 and security patterns',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Web Security Essentials', url: 'https://www.youtube.com/watch?v=F7JWKx0e0Ys', duration_minutes: 60, provider: 'freeCodeCamp' },
                            { type: 'video', title: 'OWASP Top 10', url: 'https://www.youtube.com/watch?v=rWHvp7rUka8', duration_minutes: 90, provider: 'F5 DevCentral' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Full Stack Developer',
        description: 'Master both frontend and backend development',
        icon: '🚀',
        category: 'Web Development',
        difficulty: 'intermediate',
        estimated_hours: 400,
        phases: [
            {
                phase_number: 1,
                title: 'Web Foundations',
                description: 'HTML, CSS, and JavaScript basics',
                nodes: [
                    {
                        title: 'HTML',
                        description: 'Semantic HTML and structure',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'HTML Full Course', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', duration_minutes: 120, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'CSS',
                        description: 'Styling and layouts',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'CSS Full Course', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', duration_minutes: 180, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Flexbox',
                        description: 'Flexible box layout',
                        estimated_hours: 6,
                        resources: [
                            { type: 'video', title: 'Flexbox Tutorial', url: 'https://www.youtube.com/watch?v=fYq5PXgSsbE', duration_minutes: 30, provider: 'Web Dev Simplified' }
                        ]
                    },
                    {
                        title: 'Grid',
                        description: 'CSS Grid layout system',
                        estimated_hours: 6,
                        resources: [
                            { type: 'video', title: 'CSS Grid Tutorial', url: 'https://www.youtube.com/watch?v=9zBsdzdE4sM', duration_minutes: 35, provider: 'Web Dev Simplified' }
                        ]
                    },
                    {
                        title: 'JavaScript Basics',
                        description: 'Core JavaScript fundamentals',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration_minutes: 480, provider: 'freeCodeCamp' }
                        ]
                    }
                ]
            },
            {
                phase_number: 2,
                title: 'Frontend',
                description: 'Modern frontend development',
                nodes: [
                    {
                        title: 'React Fundamentals',
                        description: 'Components, props, state, and hooks',
                        estimated_hours: 30,
                        resources: [
                            { type: 'video', title: 'React Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration_minutes: 720, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'State Management',
                        description: 'Context API, Redux, Zustand',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Redux Tutorial', url: 'https://www.youtube.com/watch?v=CVpUuw9XSjY', duration_minutes: 90, provider: 'Web Dev Simplified' }
                        ]
                    },
                    {
                        title: 'Routing',
                        description: 'React Router and navigation',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'React Router Tutorial', url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU', duration_minutes: 45, provider: 'Web Dev Simplified' }
                        ]
                    }
                ]
            },
            {
                phase_number: 3,
                title: 'Backend',
                description: 'Server-side development',
                nodes: [
                    {
                        title: 'Node.js',
                        description: 'Server-side JavaScript',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Node.js Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', duration_minutes: 480, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Express',
                        description: 'Web framework for Node.js',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Express JS Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', duration_minutes: 90, provider: 'Traversy Media' }
                        ]
                    },
                    {
                        title: 'REST APIs',
                        description: 'Build RESTful APIs',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'REST API Tutorial', url: 'https://www.youtube.com/watch?v=fgTGADljAeg', duration_minutes: 90, provider: 'Traversy Media' }
                        ]
                    }
                ]
            },
            {
                phase_number: 4,
                title: 'Database',
                description: 'Data persistence',
                nodes: [
                    {
                        title: 'PostgreSQL',
                        description: 'Relational database',
                        estimated_hours: 18,
                        resources: [
                            { type: 'video', title: 'PostgreSQL Tutorial', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', duration_minutes: 240, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Data Modeling',
                        description: 'Database design',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Database Design', url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc', duration_minutes: 120, provider: 'freeCodeCamp' }
                        ]
                    }
                ]
            },
            {
                phase_number: 5,
                title: 'Integration',
                description: 'Connect frontend and backend',
                nodes: [
                    {
                        title: 'Frontend ↔ Backend Communication',
                        description: 'API integration',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Full Stack App Tutorial', url: 'https://www.youtube.com/watch?v=98BzS5Oz5E4', duration_minutes: 240, provider: 'Traversy Media' }
                        ]
                    },
                    {
                        title: 'Authentication Flow',
                        description: 'User authentication end-to-end',
                        estimated_hours: 18,
                        resources: [
                            { type: 'video', title: 'Full Stack Auth', url: 'https://www.youtube.com/watch?v=Ud5xKCYQTjM', duration_minutes: 120, provider: 'The Net Ninja' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Data Scientist',
        description: 'Extract insights from data using statistics and ML',
        icon: '📊',
        category: 'AI & Data Science',
        difficulty: 'intermediate',
        estimated_hours: 280,
        phases: [
            {
                phase_number: 1,
                title: 'Foundations',
                description: 'Python and statistics basics',
                nodes: [
                    {
                        title: 'Python Basics',
                        description: 'Python programming fundamentals',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Python for Data Science', url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', duration_minutes: 720, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Statistics Fundamentals',
                        description: 'Descriptive and inferential statistics',
                        estimated_hours: 25,
                        resources: [
                            { type: 'video', title: 'Statistics Full Course', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration_minutes: 480, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Probability',
                        description: 'Probability theory basics',
                        estimated_hours: 20,
                        resources: [
                            { type: 'video', title: 'Probability Course', url: 'https://www.youtube.com/watch?v=1uW3qMFA9Ho', duration_minutes: 480, provider: 'Khan Academy' }
                        ]
                    }
                ]
            },
            {
                phase_number: 2,
                title: 'Data Analysis',
                description: 'Data manipulation and analysis',
                nodes: [
                    {
                        title: 'NumPy',
                        description: 'Numerical computing',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'NumPy Tutorial', url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', duration_minutes: 58, provider: 'freeCodeCamp' }
                        ]
                    },
                    {
                        title: 'Pandas',
                        description: 'Data manipulation',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'Pandas Tutorial', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration_minutes: 60, provider: 'Keith Galli' }
                        ]
                    },
                    {
                        title: 'Data Cleaning',
                        description: 'Handle missing data and outliers',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Data Cleaning Tutorial', url: 'https://www.youtube.com/watch?v=bDhvCp3_lYw', duration_minutes: 45, provider: 'Alex The Analyst' }
                        ]
                    },
                    {
                        title: 'Exploratory Data Analysis',
                        description: 'EDA techniques and insights',
                        estimated_hours: 15,
                        resources: [
                            { type: 'video', title: 'EDA Tutorial', url: 'https://www.youtube.com/watch?v=xi0vhXFPegw', duration_minutes: 90, provider: 'Krish Naik' }
                        ]
                    }
                ]
            },
            {
                phase_number: 3,
                title: 'Visualization',
                description: 'Data visualization and storytelling',
                nodes: [
                    {
                        title: 'Matplotlib',
                        description: 'Python plotting library',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Matplotlib Tutorial', url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4', duration_minutes: 60, provider: 'Corey Schafer' }
                        ]
                    },
                    {
                        title: 'Seaborn',
                        description: 'Statistical data visualization',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Seaborn Tutorial', url: 'https://www.youtube.com/watch?v=6GUZXDef2U0', duration_minutes: 45, provider: 'Keith Galli' }
                        ]
                    },
                    {
                        title: 'Data Storytelling',
                        description: 'Communicate insights effectively',
                        estimated_hours: 8,
                        resources: [
                            { type: 'video', title: 'Data Storytelling', url: 'https://www.youtube.com/watch?v=8EMW7io4rSI', duration_minutes: 60, provider: 'Google Career Certificates' }
                        ]
                    }
                ]
            },
            {
                phase_number: 4,
                title: 'ML Basics',
                description: 'Machine learning fundamentals',
                nodes: [
                    {
                        title: 'Regression',
                        description: 'Linear and polynomial regression',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Regression Tutorial', url: 'https://www.youtube.com/watch?v=nk2CQITm_eo', duration_minutes: 60, provider: 'StatQuest' }
                        ]
                    },
                    {
                        title: 'Classification',
                        description: 'Classification algorithms',
                        estimated_hours: 12,
                        resources: [
                            { type: 'video', title: 'Classification Tutorial', url: 'https://www.youtube.com/watch?v=yIYKR4sgzI8', duration_minutes: 60, provider: 'StatQuest' }
                        ]
                    },
                    {
                        title: 'Clustering',
                        description: 'Unsupervised learning',
                        estimated_hours: 10,
                        resources: [
                            { type: 'video', title: 'Clustering Algorithms', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA', duration_minutes: 90, provider: 'StatQuest' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Frontend Developer',
        description: 'Build modern user interfaces',
        icon: '💻',
        category: 'Web Development',
        difficulty: 'beginner',
        estimated_hours: 200,
        phases: [
            {
                phase_number: 1,
                title: 'Foundations',
                description: 'HTML, CSS, and JavaScript',
                nodes: [
                    { title: 'HTML', description: 'Semantic HTML', estimated_hours: 12, resources: [{ type: 'video', title: 'HTML Full Course', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', duration_minutes: 120, provider: 'freeCodeCamp' }] },
                    { title: 'CSS', description: 'Styling and layouts', estimated_hours: 15, resources: [{ type: 'video', title: 'CSS Full Course', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', duration_minutes: 180, provider: 'freeCodeCamp' }] },
                    { title: 'JavaScript Basics', description: 'Core JavaScript', estimated_hours: 25, resources: [{ type: 'video', title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', duration_minutes: 480, provider: 'freeCodeCamp' }] }
                ]
            },
            {
                phase_number: 2,
                title: 'React',
                description: 'Modern frontend framework',
                nodes: [
                    { title: 'Components', description: 'React components', estimated_hours: 15, resources: [{ type: 'video', title: 'React Course', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration_minutes: 720, provider: 'freeCodeCamp' }] },
                    { title: 'Hooks', description: 'React Hooks', estimated_hours: 12, resources: [{ type: 'video', title: 'React Hooks', url: 'https://www.youtube.com/watch?v=O6P86uwfdR0', duration_minutes: 90, provider: 'Web Dev Simplified' }] },
                    { title: 'Routing', description: 'React Router', estimated_hours: 8, resources: [{ type: 'video', title: 'React Router', url: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU', duration_minutes: 45, provider: 'Web Dev Simplified' }] }
                ]
            }
        ]
    },
    {
        name: 'DevOps Engineer',
        description: 'Master CI/CD and cloud infrastructure',
        icon: '🔧',
        category: 'Infrastructure',
        difficulty: 'advanced',
        estimated_hours: 220,
        phases: [
            {
                phase_number: 1,
                title: 'Foundations',
                description: 'Linux and networking',
                nodes: [
                    { title: 'Linux Basics', description: 'Linux fundamentals', estimated_hours: 20, resources: [{ type: 'video', title: 'Linux Tutorial', url: 'https://www.youtube.com/watch?v=2PGnYjbYuUo', duration_minutes: 120, provider: 'freeCodeCamp' }] },
                    { title: 'Shell Scripting', description: 'Bash scripting', estimated_hours: 15, resources: [{ type: 'video', title: 'Shell Scripting', url: 'https://www.youtube.com/watch?v=e7BufAVwDiM', duration_minutes: 90, provider: 'freeCodeCamp' }] }
                ]
            },
            {
                phase_number: 2,
                title: 'Containers',
                description: 'Docker and containerization',
                nodes: [
                    { title: 'Docker Fundamentals', description: 'Docker basics', estimated_hours: 18, resources: [{ type: 'video', title: 'Docker Tutorial', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', duration_minutes: 180, provider: 'freeCodeCamp' }] },
                    { title: 'Docker Compose', description: 'Multi-container apps', estimated_hours: 10, resources: [{ type: 'video', title: 'Docker Compose', url: 'https://www.youtube.com/watch?v=SXwC9fSwct8', duration_minutes: 60, provider: 'TechWorld with Nana' }] }
                ]
            },
            {
                phase_number: 3,
                title: 'CI/CD',
                description: 'Continuous integration and deployment',
                nodes: [
                    { title: 'GitHub Actions', description: 'CI/CD pipelines', estimated_hours: 15, resources: [{ type: 'video', title: 'GitHub Actions Tutorial', url: 'https://www.youtube.com/watch?v=R8_veQiYBjI', duration_minutes: 90, provider: 'freeCodeCamp' }] }
                ]
            },
            {
                phase_number: 4,
                title: 'Cloud',
                description: 'Cloud platforms',
                nodes: [
                    { title: 'AWS Basics', description: 'Amazon Web Services', estimated_hours: 25, resources: [{ type: 'video', title: 'AWS Tutorial', url: 'https://www.youtube.com/watch?v=ulprqHHWlng', duration_minutes: 240, provider: 'freeCodeCamp' }] }
                ]
            }
        ]
    }
];
