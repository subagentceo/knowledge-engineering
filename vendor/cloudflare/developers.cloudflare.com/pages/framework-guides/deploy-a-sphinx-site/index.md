---
title: Sphinx
description: Deploy a Sphinx documentation site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sphinx

[Sphinx ↗](https://www.sphinx-doc.org/) is a tool that makes it easy to create documentation and was originally made for the publication of Python documentation. It is well known for its simplicity and ease of use.

In this guide, you will create a new Sphinx project and deploy it using Cloudflare Pages.

## Prerequisites

* Python 3 - Sphinx is based on Python, therefore you must have Python installed
* [pip ↗](https://pypi.org/project/pip/) \- The PyPA recommended tool for installing Python packages
* [pipenv ↗](https://pipenv.pypa.io/en/latest/) \- automatically creates and manages a virtualenv for your projects

Note

If you are already running a version of Python 3.7, ensure that Python version 3.7 is also installed on your computer before you begin this guide. Python 3.7 is the latest version supported by Cloudflare Pages.

The latest version of Python 3.7 is 3.7.11:

[Python 3.7.11 ↗](https://www.python.org/downloads/release/python-3711/)

### Installing Python

Refer to the official Python documentation for installation guidance:

* [Windows ↗](https://www.python.org/downloads/windows/)
* [Linux/UNIX ↗](https://www.python.org/downloads/source/)
* [macOS ↗](https://www.python.org/downloads/macos/)
* [Other ↗](https://www.python.org/download/other/)

### Installing Pipenv

If you already had an earlier version of Python installed before installing version 3.7, other global packages you may have installed could interfere with the following steps to install Pipenv, or your other Python projects which depend on global packages.

[Pipenv ↗](https://pipenv.pypa.io/en/latest/) is a Python-based package manager that makes managing virtual environments simple. This guide will not require you to have prior experience with or knowledge of Pipenv to complete your Sphinx site deployment. Cloudflare Pages natively supports the use of Pipenv and, by default, has the latest version installed.

The quickest way to install Pipenv is by running the command:

Terminal window

```

pip install --user pipenv


```

This command will install Pipenv to your user level directory and will make it accessible via your terminal. You can confirm this by running the following command and reviewing the expected output:

Terminal window

```

pipenv --version


```

```

pipenv, version 2021.5.29


```

### Creating a Sphinx project directory

From your terminal, run the following commands to create a new directory and navigate to it:

Terminal window

```

mkdir my-wonderful-new-sphinx-project

cd my-wonderful-new-sphinx-project


```

### Pipenv with Python 3.7

Pipenv allows you to specify which version of Python to associate with a virtual environment. For the purpose of this guide, the virtual environment for your Sphinx project must use Python 3.7.

Use the following command:

Terminal window

```

pipenv --python 3.7


```

You should see the following output:

Terminal window

```

Creating a virtualenv for this project...

Pipfile: /home/ubuntu/my-wonderful-new-sphinx-project/Pipfile

Using /usr/bin/python3.7m (3.7.11) to create virtualenv...

⠸ Creating virtual environment...created virtual environment CPython3.7.11.final.0-64 in 1598ms

  creator CPython3Posix(dest=/home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr, clear=False, no_vcs_ignore=False, global=False)

  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/home/ubuntu/.local/share/virtualenv)

    added seed packages: pip==21.1.3, setuptools==57.1.0, wheel==0.36.2

  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator,XonshActivator


✔ Successfully created virtual environment!

Virtualenv location: /home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr

Creating a Pipfile for this project...


```

List the contents of the directory:

Terminal window

```

ls


```

```

Pipfile


```

### Installing Sphinx

Before installing Sphinx, create the directory you want your project to live in.

From your terminal, run the following command to install Sphinx:

Terminal window

```

pipenv install sphinx


```

You should see output similar to the following:

Terminal window

```

Installing sphinx...

Adding sphinx to Pipfile's [packages]...

✔ Installation Succeeded

Pipfile.lock not found, creating...

Locking [dev-packages] dependencies...

Locking [packages] dependencies...

Building requirements...

Resolving dependencies...

✔ Success!

Updated Pipfile.lock (763aa3)!

Installing dependencies from Pipfile.lock (763aa3)...

  🐍   ▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉▉ 0/0 — 00:00:00

To activate this project's virtualenv, run pipenv shell.

Alternatively, run a command inside the virtualenv with pipenv run.


```

This will install Sphinx into a new virtual environment managed by Pipenv. You should see a directory structure like this:

Terminal window

```

my-wonderful-new-sphinx-project

|--Pipfile

|--Pipfile.lock


```

## Creating a new project

With Sphinx installed, you can now run the quickstart command to create a template project for you. This command will only work within the Pipenv environment you created in the previous step. To enter that environment, run the following command from your terminal:

Terminal window

```

pipenv shell


```

```

Launching subshell in virtual environment...

ubuntu@sphinx-demo:~/my-wonderful-new-sphinx-project$  . /home/ubuntu/.local/share/virtualenvs/my-wonderful-new-sphinx-project-Y2HfWoOr/bin/activate


```

Now run the following command:

Terminal window

```

sphinx-quickstart


```

You will be presented with a number of questions, please answer them in the following:

```

Separate source and build directories (y/n) [n]: Y

Project name: <Your project name>

Author name(s): <You Author Name>

Project release []: <You can accept default here or provide a version>

Project language [en]: <You can accept en here or provide a regional language code>


```

This will create four new files in your active directory, `source/conf.py`, `index.rst`, `Makefile` and `make.bat`:

Terminal window

```

my-wonderful-new-sphinx-project

|--Pipfile

|--Pipfile.lock

|--source

|----_static

|----_templates

|----conf.py

|----index.rst

|--Makefile

|--make.bat


```

You now have everything you need to start deploying your site to Cloudflare Pages. For learning how to create documentation with Sphinx, refer to the official [Sphinx documentation ↗](https://www.sphinx-doc.org/en/master/usage/quickstart.html).

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Creating a GitHub repository

In a separate terminal window that is not within the pipenv shell session, verify that SSH key-based authentication is working:

Terminal window

```

eval "$(ssh-agent)"

ssh-add -T ~/.ssh/id_rsa.pub

ssh -T git@github.com


```

```

The authenticity of host 'github.com (140.82.113.4)' can't be established.

RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.

Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added 'github.com,140.82.113.4' (RSA) to the list of known hosts.

Hi yourgithubusername! You've successfully authenticated, but GitHub does not provide shell access.


```

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After your repository is set up, push your application to GitHub by running the following commands in your terminal:

Terminal window

```

git init

git config user.name "Your Name"

git config user.email "username@domain.com"

git remote add origin git@github.com:yourgithubusername/githubrepo.git

git add .

git commit -m "Initial commit"

git branch -M main

git push -u origin main


```

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Select the new GitHub repository that you created and then select **Begin setup**.
6. In the **Set up builds and deployments** section, provide the following information:

| Configuration option | Value      |
| -------------------- | ---------- |
| Production branch    | main       |
| Build command        | make html  |
| Build directory      | build/html |

Below the configuration, make sure to set the environment variable for specifying the `PYTHON_VERSION`.

For example:

| Variable name   | Value |
| --------------- | ----- |
| PYTHON\_VERSION | 3.7   |

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `Pipenv`, your project dependencies, and building your site, before deployment.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Sphinx site, Cloudflare Pages will automatically rebuild your project and deploy it.

You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Sphinx site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-sphinx-site/#page","headline":"Sphinx · Cloudflare Pages docs","description":"Deploy a Sphinx documentation site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-sphinx-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-sphinx-site/","name":"Sphinx"}}]}
```
