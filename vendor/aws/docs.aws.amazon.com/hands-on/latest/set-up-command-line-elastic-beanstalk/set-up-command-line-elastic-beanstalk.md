

# Set up the Elastic Beanstalk Command Line Interface with AWS Elastic Beanstalk and AWS Identity and Access Management (IAM)
<a name="set-up-command-line-elastic-beanstalk"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Cost to complete** | [Free tier](https://free/) eligible <br />There is no additional charge for AWS Elastic Beanstalk. The resources you create in this tutorial are Free Tier eligible.   | 
| **Requirements** | An AWS account  | 

## Introduction
<a name="introduction"></a>

In this step-by-step tutorial, you will set up the Elastic Beanstalk Command Line Interface (EB CLI). This is part one of a two-part tutorial. In the second half of EB CLI tutorial, you will deploy and monitor an application on the AWS cloud. 

Elastic Beanstalk (EB) is a service used to deploy, manage, and scale web applications and services. You can use Elastic Beanstalk from the [AWS Management console](https://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/) or from the command line using the Elastic Beanstalk Command Line Interface (EB CLI). You should use the EB CLI as part of your everyday development and testing cycle when you favor using the terminal. 

You can use EB with popular languages and frameworks including Node, PHP, Java, Python, Ruby, .NET/IIS, Tomcat, Docker, and Multi-Container Docker. 

During this part of the EB CLI tutorial, you will set up a user with the proper permissions then install the EB CLI. 

## Implementation
<a name="implementation"></a>

### Step 1: Create and set up an IAM user
<a name="create-and-set-up-an-iam-user"></a>

In this step, you will create an IAM user and grant access for the user to use AWS from the command line. Next, you will grant the user an Elastic Beanstalk IAM permission. Finally, you will download the user credentials for use later in the tutorial. 

1. Open the IAM Console

   Open the [AWS Identity and Access Management (IAM) console](https://console.aws.amazon.com/iam/home). In the navigation pane on the left, select **Users**.   
![The AWS Identity and Access Management (IAM) dashboard, with the 'Users' section highlighted in red on the left sidebar. The dashboard displays IAM resources, security status, and additional information links.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/iam-dashboard-users-highlighted-iamlong.png)

1. Add a new user

   Select **Add user**.   
![The AWS Identity and Access Management (IAM) console highlighting the 'Add user' button on the Users page.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/iam-user-screen-bce-iamlong-console.png)

1. Configure users

   For **User name**, enter **eb-admin**. 

   To use the EB CLI with the **eb-admin** user, it needs programmatic access to AWS. But to use the EB CLI, **eb-admin** does not need access to the AWS Management console. 

   Understanding that, for Access type, choose **Programmatic access**. 

   Leave **AWS Management Console access** unchecked. 

   Select **Next: Permissions**.   
![The AWS Management Console showing how to add a new user named 'eb-admin' with programmatic access selected. The 'Next: Permissions' button is highlighted to proceed to the next step.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/user-admin-programmatic-access-console-how.png)

1. Add user to group

   Select **Add user to group** then select **Create group**.   
![The AWS Management Console showing the step to add a user to a group when setting permissions, highlighting the 'Add user to group' option and the 'Create group' button during the IAM user creation process.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/user-group-permissions-console-when.png)

1. Configure group

   In the **Group name** field, enter **eb-admins**. In the policy section of this screen, you need to select the IAM policy which grants members of the group full access to Elastic Beanstalk. 

   In the policy search box, type **AWSElasticBeanstalkFullAccess**. 

   Select **AWSElasticBeanstalkFullAccess**and select **Create group**.   
![The AWS Identity and Access Management (IAM) console showing how to create a group named 'eb-admins' with the 'AWSElasticBeanstalkFullAccess' policy selected, granting full access to AWS Elastic Beanstalk and its underlying services.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/iam-group-elastic-beanstalk-full-access.png)

1. Verify the policy is attached

   You will see **eb-admin** created with the **AWSElasticBeanstalkFullAccess**policy attached to the group. 

   Select **Next: Review**.   
![The AWS IAM console showing the process of setting permissions for a user by adding them to a group with AWSElasticBeanstalkFullAccess policy attached.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/user-permissions-elastic-beanstalk-full.png)

1. Review configuration

   Review your user details and permissions. Select **Create group**. 

1. Download credentials

   In a later step, you will need to use **eb-admin's** access key from this page. 

   Save the access key and secret access key on your workstation by selecting **Download .csv**. Select **Close**.   
![The AWS Management Console showing the final step in adding a new user, with a success message, downloadable credentials (.csv), and user information including access key ID and secret access key.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/user-success-download-credentials.png)

### Step 2: Install the EB CLI
<a name="install-the-eb-cli"></a>

In this step, you will install the EB command line interface. Follow the OS specific configuration steps. 

------
#### [ Windows ]

1. Download and install Python 3.6\+ by going to the [Python Software Foundation](https://www.python.org/downloads/) website and choose the version of Python for your OS. Make sure and select **Add Python to environment variables**  in the Python installer so Python will work from any command line location. The Python installer will install Python and the pip package manager. 

1. Start the Windows Command Prompt using the Run Window (Win \+R on your keyboard) and typing **cmd** then pressing **Enter**. 

1. Using the Windows Command Prompt, confirm that Python is installed properly by running: 

   ```
   python --version
   ```

1. Using the Windows Command Prompt, confirm that pip is installed properly by running: 

   ```
   pip --version
   ```

1. Now that Python and pip has been installed, install the EB CLI by running: 

   ```
   pip install awsebcli --upgrade --use
   ```

1. Now confirm that the EB CLI is installed correctly by running: 

   ```
   eb --version
   ```

![The Python 3.6.4 (32-bit) Windows setup advanced options, highlighting the 'Add Python to environment variables' option. Intended for a tutorial on setting up the command line environment for AWS Elastic Beanstalk on Windows.](http://docs.aws.amazon.com/hands-on/latest/set-up-command-line-elastic-beanstalk/images/ahthjxd-setup-command-line-elastic.png)


------
#### [ Linux ]

1. Your modern Linux distro probably includes Python by default. Confirm that Python is installed by starting a terminal session and running the following command: 

   ```
   python -–version
   ```

1. If your Python Version is 2.7, continue with these installation instructions. If your Python is greater than 2.7, do not use these installation instructions. Use the comprehensive [EB CLI installation instructions](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-linux.html) . 

1. Now confirm that the pip Python package manager is installed by running the following command: 

   ```
   pip -–version
   ```

1. Now that Python and pip have been verified, install the EB CLI by running: 

   ```
   pip install awsebcli --upgrade --user
   ```

1. Now confirm that the EB CLI is installed correctly by running: 

   ```
   eb –-version
   ```

------
#### [ macOS ]

1. Start the macOS terminal application. 

1. If you have the [Homebrew package manager](https://brew.sh/) on your mac, update your homebrew fomulae by running the following command in Terminal: 

   ```
   brew update
   ```

1. If you don't have the the [Homebrew package manager](https://brew.sh/) installed, install it by running the following command in Terminal: 

   ```
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

1. Using Homebrew, install the EB CLI by running the following command in Terminal: 

   ```
   brew install awsebcli
   ```

1. Now confirm that the EB CLI is installed correctly by running: 

   ```
   eb --version
   ```

------

## Congratulations\!
<a name="congratulations"></a>

Congratulations, you have set up the Elastic Beanstalk Command Line Interface. You should use the EB CLI to deploy and manage applications whenever you want the power of Elastic Beanstalk from the command line. 