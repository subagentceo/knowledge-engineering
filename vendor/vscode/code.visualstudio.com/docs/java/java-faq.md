# Frequent Asked Questions

Thanks for your interest in Java on Visual Studio Code! This FAQ will hopefully answer some of the questions you may have.

## Are these Java extensions open source?

Yes. All the Java Extensions provided by Red Hat, Microsoft, and VMware are open source, as well as most extensions supported by the community. You can find their corresponding repositories on GitHub from the Marketplace pages.

## Are there any other features coming to Java on Visual Studio Code?

Definitely. We use GitHub issues to track incoming requests and planned work for each of our extensions. Currently we're working on adding more refactoring and linting features to enhance the editing productivity, as well as some performance improvements to make it even faster.

Most of our work is collected from and prioritized by customer feedback. If you're interested in providing your thoughts, you can go directly to our project repositories to submit a new issue to share your thoughts.

We do have limited capacity within the team and we'd really like to encourage more contributions from the great Java community. If you're passionate about your idea and would like to help fellow Java developers, you're welcome to join us! Some areas worth considering including Gradle support, code analysis and test coverage tools, profiler, and additional framework support including DropWizard, JavaFX, JPA, Play, Akka, OSGi.

## Can I use keyboard shortcuts from other IDE?

Sure. Keymap extensions in VS Code modify the VS Code shortcuts to match those of other editors. You can find IntelliJ IDEA keyboard shortcuts, Eclipse Keymap as well as keymaps for other popular editors in Keymaps category of extensions in the Marketplace.

## Where can I find the latest progress of Java support on Visual Studio Code?

You can follow us on the Java at Microsoft blog, which will keep you updated on our progress.

While you're using Java within VS Code, you may also see a **Release Notes** section after you update the Extension Pack for Java. The notes will give you an overview on the notable updates included in the extensions.

## How can I use Visual Studio Code with new Java versions?

Thanks to the upstream update from JDT, you can now build your project up to Java 22 with VS Code as well. To use the experimental/preview language features, you need to modify your project settings.

Maven - modify `pom.xml`:

```
  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <configuration>
            <release>22</release>
            <compilerArgs>--enable-preview</compilerArgs>
          </configuration>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
```

Gradle:

```
sourceCompatibility = 22
tasks.withType(JavaCompile) {
    options.compilerArgs += '--enable-preview'
}
tasks.withType(Test) {
    jvmArgs += "--enable-preview"
}
```

> Note: If you are modifying a project that was already opened in VS Code, you may need to force clean the workspace and reload. To do so, run command **Java: Clean Java Language Server Workspace**.

## How can I use it behind a corporate proxy?

When using the Java Language Support (redhat.java) extension behind a corporate proxy, you might need to let the Java Language server know how to connect to the Internet, in order to download build runtimes, Java dependencies, and their sources through that proxy.

This is done by configuring the `java.jdt.ls.vmargs` setting in VS Code preferences (all on one line):

```
{
  "java.jdt.ls.vmargs": "-Dhttp.proxyHost=webproxy.corp.net -Dhttp.proxyPort=proxyport -Dhttp.proxyUser=user -Dhttp.proxyPassword=password -Dhttps.proxyHost=webproxy.corp.net -Dhttps.proxyPort=proxyport -Dhttps.proxyUser=user -Dhttps.proxyPassword=password"
}
```

## Will this be available for Visual Studio?

Currently we don't plan to extend the Java support to Visual Studio. There are already great IDEs for Java and we're focusing on VS Code to provide a lightweight experience in a polyglot editor.

## Does VS Code Java support other display languages?

Currently we support Chinese in addition to English for a few extensions including Debugger for Java, Test Runner for Java, Maven for Java, Project Manager for Java. To learn how to switch the VS Code display language, see Display Languages.

You can contribute to the extension repositories if you're interested in additional display language support.

## How to troubleshoot and contribute to the Java Language Server

You can visit the Java for Visual Studio Code wiki to find answers regarding:

1.  "Classpath is incomplete" warning
2.  Annotation Processing support for Maven projects
3.  Contribute a Java extension
4.  Formatter settings
5.  Lombok Support
6.  Using a Proxy
7.  Troubleshooting

8/31/2021