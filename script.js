const appointments = [];

// Função para verificar e reservar horário
function checkAndBook() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value;
    const services = Array.from(document.querySelectorAll('#services input:checked')).map(input => input.value).join(', ');

    if (date && time && name && services) {
        // Verifica se já existe um agendamento para a data e hora selecionadas
        const isBooked = appointments.some(appointment => appointment.date === date && appointment.time === time);
        
        if (isBooked) {
            alert('Este horário já está agendado. Por favor, escolha outro.');
        } else {
            appointments.push({ date, time, name, services });
            sendWhatsAppMessage(date, time, name, services);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para enviar a mensagem de agendamento via WhatsApp
function sendWhatsAppMessage(date, time, name, services) {
    const formattedDate = formatDate(date);
    const message = `*Solicitação de Agendamento*\n\n*Data:* ${formattedDate}\n*Hora:* ${time}\n*Nome:* ${name}\n*Serviços:* ${services}`;
    const phoneNumber = '5564992952748';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}

function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}
