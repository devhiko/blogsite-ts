window.addEventListener('load', () => {
    const form = document.getElementById("add-blog-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const topicval = document.getElementById("blog-topic");
        const contentval = document.getElementById("blog-content");
        const category = document.getElementById('blog-category');
        console.log(topicval.value, contentval.value, category.value);
        const blogData = {
            topic: topicval.value,
            content: contentval.value,
            id: Math.floor(Math.random() * 100),
            likes: 0,
            createdAt: Date().toString(),
            category: category.value
        };
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blogData)
        })
            .then((res) => { return res.json(); })
            .then((data) => { console.log('Blogs:', data); })
            .catch((err) => { console.log(err); });
        form.reset();
    });
});
export {};
