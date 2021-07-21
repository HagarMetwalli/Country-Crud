$(document).ready(function () {
    localStorage.setItem("usertoken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGdWxsTmFtZSI6IlRlc3QgVXNlciIsIm5iZiI6MTYyNjg4NzAxOCwiZXhwIjoxNjI2OTczNDE4LCJpYXQiOjE2MjY4ODcwMTh9.-1818vfB-cBNHOZGNdihFhRc9JWkc4NYVCtOlti9hR0")
    $.ajax({
        method: "GET",
        url: "https://demotestapi.catalist-me.com/api/Country/GetAllCountries",
        headers: { "Authorization": "Bearer " + localStorage.getItem("usertoken") },
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        failure: function (response) {
            console.log(response.d);
        },
        error: function (response) {
            console.log(response.d);
        }
    });
});
function OnSuccess(response) {
    $("#countrytbl").DataTable(
        {
            LengthChange: true,
            lengthMenu: [[5, 10, -1], [5, 10, "All"]],
            Filter: true,
            Sort: true,
            Paginate: true,
            data: response.response.countries,
            columns: [
                { 'title': 'ID', 'data': 'id' },
                { 'title': 'Name', 'data': 'countryName' },
                { 'title': 'language', 'data': 'languageName' },
                {
                    'title': 'Date', 'data': 'createdDate',
                    "type": "datetime",
                    "render": function (d, type, full) {
                        d = new Date(d);
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = ' ' + d.getFullYear(),
                        hour = d.getHours();
                           

                        if (month.length < 2)
                            month = '0' + month;
                        if (day.length < 2)
                            day = '0' + day;
                        if (hour > 12)
                            hour = (hour - 12) + ":" + d.getMinutes() + " " + 'PM';
                        else if (hour < 12)
                            hour += ":" + d.getMinutes() +" "+'AM';

                        return [day, month, year, hour].join('-');
                    }

                },
                { 'title': 'active', 'data': 'active' },
                {
                    'data': 'id', 'width': '50px', 'render': function (data) {
                        return '<a class="btn btn-info" href="http://localhost:34063/Home/Details/'+data+'"> Details</a>'
                    }
                },
                {
                    'data': 'id', 'width': '50px', 'render': function (data) {
                        return '<a class="btn btn-warning" href="http://localhost:34063/Home/Edit/'+data+'"> Edit</a>'
                    }
                },
                {
                    'data': 'id', 'width': '50px', 'render': function (data) {
                        return `<a class="btn btn-danger" onClick=Delete(`+data+`)> Delete</a>`
                    }
                }
            ]
        });
}

function Delete(id) {

    $.ajax({
        url: "https://demotestapi.catalist-me.com/api/Country/DeleteCountry/?CountryId="+id,
        method: "DELETE",
        headers: { "Authorization": "Bearer " + localStorage.getItem("usertoken") },
  
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: () => {
           // $("#countrytbl").DataTable().ajax.reload();
             location.reload();
        },
        error: function (response) {
            alert(response.d);
        }
    });
}

