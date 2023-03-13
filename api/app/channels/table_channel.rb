class TableChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "table_#{params[:table_number]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
