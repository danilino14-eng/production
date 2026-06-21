"""
=========================================================
  CINEMATIC STUDIO WEBSITE - Flask App
=========================================================
  This is the main application file.
  Routes are kept simple on purpose so a beginner can
  add new pages easily.

  To add a new page:
    1. Create a new .html file in /templates
    2. Add a new @app.route() function below
=========================================================
"""

from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)

# Used only for flashing success/error messages on the contact form.
# Change this to any random string for production.
app.secret_key = "change-this-secret-key"


# ---------------------------------------------------------
# HOME PAGE
# ---------------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")


# ---------------------------------------------------------
# PORTFOLIO PAGE
# ---------------------------------------------------------
@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


# ---------------------------------------------------------
# CONTACT PAGE (GET shows the form, POST handles submission)
# ---------------------------------------------------------
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        # Grab form data
        name = request.form.get("name")
        email = request.form.get("email")
        company = request.form.get("company")
        project_type = request.form.get("project_type")
        message = request.form.get("message")

        # --------------------------------------------------
        # NOTE: No database is used in this project.
        # Right now the submission is just printed to the
        # console. To actually receive messages, plug in:
        #   - an email service (e.g. Flask-Mail)
        #   - a database (e.g. SQLite)
        #   - a third-party form service (e.g. Formspree)
        # --------------------------------------------------
        print("New contact form submission:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Company: {company}")
        print(f"Project type: {project_type}")
        print(f"Message: {message}")

        flash("Thank you! Your message has been sent. We'll be in touch soon.")
        return redirect(url_for("contact"))

    return render_template("contact.html")


if __name__ == "__main__":
    # debug=True is fine for local development, turn off in production
    app.run(debug=True)
