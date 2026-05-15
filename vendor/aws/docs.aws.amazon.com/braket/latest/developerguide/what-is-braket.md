

# What is Amazon Braket?
<a name="what-is-braket"></a>

**Tip**  
**Learn the foundations of quantum computing with AWS\!** Enroll in the [Amazon Braket Digital Learning Plan](https://skillbuilder.aws/learning-plan/EH35DWGU3R/amazon-braket--knowledge-badge-readiness-path-includes-labs) and earn your own Digital badge after completing a series of learning courses and a digital assessment.

 Amazon Braket is a fully managed AWS service that helps researchers, scientists, and developers get started with quantum computing. Quantum computing has the potential to solve computational problems that are beyond the reach of classical computers because it harnesses the laws of quantum mechanics to process information in new ways.

Gaining access to quantum computing hardware can be expensive and inconvenient. Limited access makes it difficult to run algorithms, optimize designs, evaluate the current state of the technology, and plan for when to invest your resources for maximum benefit. Braket helps you overcome these challenges.

 Braket offers a single point of access to a variety of quantum computing technologies. With Braket, you can:
+ Explore and design quantum and hybrid algorithms.
+ Test algorithms on different quantum circuit simulators.
+ Run algorithms on different types of quantum computers.
+ Create proof of concept applications.

Defining quantum problems and programming quantum computers to solve them requires a new set of skills. To help you gain these skills, Braket offers different environments to simulate and run your quantum algorithms. You can find the approach that best suits your requirements and get started quickly with a set of example environments called *notebooks*.

 Braket development has three stages :
+ [Build](https://docs.aws.amazon.com/braket/latest/developerguide/braket-build.html) - Braket provides fully managed Jupyter notebook environments that make it straightforward to get started. Braket notebooks are pre-installed with sample algorithms, resources, and developer tools, including the Amazon Braket SDK. With the Amazon Braket SDK, you can build quantum algorithms and then test and run them on different quantum computers and simulators by changing a single line of code.
+ [Test](https://docs.aws.amazon.com/braket/latest/developerguide/braket-test.html) - Braket provides access to fully managed, high-performance quantum circuit simulators. You can test and validate your circuits. Braket handles all the underlying software components and Amazon Elastic Compute Cloud (Amazon EC2) clusters to take away the burden of simulating quantum circuits on classical high performance computing (HPC) infrastructure.
+ [Run](https://docs.aws.amazon.com/braket/latest/developerguide/braket-using.html) - Braket provides secure, on-demand access to different types of quantum computers. You have access to gate-based quantum computers from AQT, IonQ, IQM, and Rigetti, as well as an Analog Hamiltonian Simulator from QuEra. You also have no upfront commitment, and no need to procure access through individual providers.

 **About quantum computing and Braket ** 

Quantum computing is in its early developmental stage. It's important to understand that no universal, fault-tolerant quantum computer exists at present. Therefore, certain types of quantum hardware are better suited for each use case and it's crucial to have access to a variety of computing hardware. Braket offers a variety of hardware through third-party providers.

Existing quantum hardware is limited due to noise, which introduces errors. The industry is in the Noisy Intermediate Scale Quantum (NISQ) era. In the NISQ era, quantum computing devices are too noisy to sustain pure quantum algorithms, such as *Shor's algorithm* or *Grover's algorithm*. Until better quantum error correction is available, the most practical quantum computing requires the combination of classical (traditional) computing resources with quantum computers to create hybrid algorithms. Braket helps you work with *hybrid quantum algorithms.* 

In hybrid quantum algorithms, quantum processing units (QPUs) are used as co-processors for CPUs, thus speeding up specific calculations in a classical algorithm. These algorithms utilize iterative processing, in which computation moves between classical and quantum computers. For example, current applications of quantum computing in chemistry, optimization, and machine learning are based on *variational quantum algorithms*, which are a type of *hybrid quantum algorithm*. In variational quantum algorithms, classical optimization routines adjust the parameters of a parameterized quantum circuit iteratively, much in the same way the weights of a neural network are adjusted iteratively based on the error in a machine learning training set. Braket offers access to the PennyLane open source software library, which assists you with *variational quantum algorithms.* 

Quantum computing is gaining traction for computations in four main areas:
+  **Number theory** — including factoring and cryptography (for example, *Shor's algorithm* is a primary quantum method for number theory computations)
+  **Optimization** — including constraint satisfaction, solving linear systems, and machine learning
+  **Oracular computing** — including search, hidden subgroups, and order finding (for example, *Grover's algorithm* is a primary quantum method for oracular computations)
+  **Simulation** — including direct simulation, knot invariants, and quantum approximate optimization algorithm (QAOA) applications

Applications for these categories of computations can be found in financial services, biotechnology, manufacturing, and pharmaceuticals, to name a few. Braket offers capabilities and example notebooks that can already be applied to many proof of concept problems in addition to certain practical problems.

**Topics**
+ [How Amazon Braket works](braket-how-it-works.md)
+ [Amazon Braket terms and concepts](braket-terms.md)
+ [Cost tracking and saving](braket-pricing.md)
+ [API references and repos for Amazon Braket](braket-references.md)
+ [Amazon Braket supported regions and devices](braket-devices.md)