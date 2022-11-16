=====
django-fsc-example
=====

fsc-example is an example of "Full Stack Component" Django app.

Quick start
-----------

1. Add "fscexample" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'fscexample',
    ]

2. Include the fscexample URLconf in your project urls.py like this::

    path('fscex/', include('fscexample.urls')),

3. Use fscexample in your HTML like so::

    <head>
        ...
        <script type="module" src="{% static 'fscexample/fsc-example.mjs' %}"></script>
        ...
    </head>
    <body>
        ...
        <fsc-example key="test"></fsc-example>
        ...
    </body>

4. If you want server to feed fscexample content (useful for search engines indexations)::

    {% load fscexample_tags %}
    ...
    <fsc-example key="test">
        {% fsc_example_content "test" %}
    </fsc-example>