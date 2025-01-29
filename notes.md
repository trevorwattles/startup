# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

### My server http://54.197.191.110 or *.trevorscs260.click
When setting up a web server, using a cloud provider like AWS is more practical and secure than hosting it on your personal computer. AWS allows you to create a virtual server instance in a data center located in regions such as Virginia or Tokyo. To set up your server, log into the AWS console, navigate to the EC2 service, and ensure your region is set to US East (N. Virginia). Use the provided AMI ID (ami-018f3a022e128a6b2) to access a pre-configured image with Ubuntu, Node.js, NVM, Caddy Server, and PM2. Choose an instance type like t3.nano, t3.micro, or t2.micro depending on your needs and budget. Set up security by creating a key pair for SSH access and configuring security group rules to allow SSH, HTTP, and HTTPS traffic.

After launching the instance, copy its public IP address to access the server in your browser. To maintain consistent access, assign an Elastic IP address, ensuring it doesn’t change even if the server is stopped. Note that Elastic IP addresses are free while the associated server is running but incur minimal charges when the server is stopped. For SSH access, use your key pair and IP address. AWS allows you to scale your server's resources, so start with the t3.nano size for basic tasks and upgrade if necessary. Keep the server running for uninterrupted access, but you can stop it to save costs when not in use. Elastic IP ensures reliability and flexibility for your server’s configuration.

### Creating a domain
To make your web server accessible via a memorable and secure domain name, use AWS Route 53 to purchase and manage a domain. After registering a domain (e.g., mysite.click), create DNS records to map the domain and its subdomains (using a wildcard * record) to your server’s public IP address. This allows users to access your site via URLs like mysite.click or app.mysite.click. Ensure you verify your contact email during registration to prevent domain loss. AWS automatically creates critical NS and SOA records to ensure your DNS records are secure and authorized. Once configured, your domain will direct users to your server, though initial connections will lack HTTPS security, which can be resolved in future steps.

## HTML Notes

To deploy the **Simon HTML** project, use a **POSIX-compliant console** (not PowerShell or CMD) and run `deployFiles.sh` from the project directory. The script performs three key tasks: **deleting any previous deployment**, **uploading all project files**, and **ensuring Caddy hosts the site** under the `simon` subdomain (e.g., `simon.yourdomain.click`). To execute the deployment, use the command `./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon`, replacing the placeholders with your actual key and domain. For example, a typical deployment command might be `./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon`. After deployment, verify that your project is accessible online and update `notes.md` with any relevant observations.

hello I have modified this file

## first instruction notes

git clone "url" will put the repository into your working directory
git add --all will add the files ready to commit
git commit -am "your notes" will commit your changes
git push will push it all to your github
