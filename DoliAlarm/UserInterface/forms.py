"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import ugettext_lazy as _

class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'id': 'Email',
                                   'class': 'form-control',
                                   'placeholder': 'email'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'id': 'Password',
                                   'class': 'form-control',
                                   'placeholder':'Password'}))